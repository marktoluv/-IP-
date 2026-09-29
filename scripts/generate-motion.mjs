import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mediaDir = path.join(projectRoot, 'public', 'media')
const inputNames = ['motion-01.webp', 'after-light.webp', 'soft-machines.webp']
const inputs = inputNames.map((name) => path.join(mediaDir, name))
const webmOutput = path.join(mediaDir, 'eira-motion.webm')
const mp4Output = path.join(mediaDir, 'eira-motion.mp4')
const ffmpegPath = process.env.FFMPEG_PATH?.trim() || 'ffmpeg'

if (process.env.FFMPEG_PATH && !existsSync(ffmpegPath)) {
  throw new Error(`FFMPEG_PATH does not exist: ${ffmpegPath}`)
}

for (const input of inputs) {
  if (!existsSync(input)) throw new Error(`Missing source image: ${input}`)
}

// Three 3-second stills, joined by two 0.5-second dissolves, yield 8 seconds.
// The portrait crop is biased upward to keep EIRA's face in view.
const filters = [
  "[0:v]scale=1408:792:force_original_aspect_ratio=increase,crop=1408:792:(in_w-out_w)/2:(in_h-out_h)/2,zoompan=z='min(zoom+0.0007,1.06)':x='(iw-iw/zoom)*on/72':y='(ih-ih/zoom)/2':d=1:s=1280x720:fps=24,trim=duration=3,setpts=PTS-STARTPTS,format=yuv420p[v0]",
  "[1:v]scale=1408:792:force_original_aspect_ratio=increase,crop=1408:792:(in_w-out_w)/2:(in_h-out_h)*0.25,zoompan=z='min(zoom+0.0007,1.06)':x='(iw-iw/zoom)*(1-on/72)':y='(ih-ih/zoom)/2':d=1:s=1280x720:fps=24,trim=duration=3,setpts=PTS-STARTPTS,format=yuv420p[v1]",
  "[2:v]scale=1408:792:force_original_aspect_ratio=increase,crop=1408:792:(in_w-out_w)/2:(in_h-out_h)*0.12,zoompan=z='min(zoom+0.0007,1.06)':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*on/72':d=1:s=1280x720:fps=24,trim=duration=3,setpts=PTS-STARTPTS,format=yuv420p[v2]",
  '[v0][v1]xfade=transition=fade:duration=0.5:offset=2.5[x1]',
  '[x1][v2]xfade=transition=fade:duration=0.5:offset=5.0,format=yuv420p[video]',
].join(';')

const webmArgs = [
  '-hide_banner', '-loglevel', 'error', '-y',
  ...inputs.flatMap((input) => ['-loop', '1', '-framerate', '24', '-t', '3', '-i', input]),
  '-filter_complex', filters,
  '-map', '[video]', '-an',
  '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '35',
  '-deadline', 'good', '-cpu-used', '3', '-row-mt', '1',
  '-r', '24', '-t', '8', '-pix_fmt', 'yuv420p',
  webmOutput,
]

const mp4Args = [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-i', webmOutput, '-map', '0:v:0', '-an',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '25',
  '-pix_fmt', 'yuv420p', '-r', '24', '-t', '8',
  '-movflags', '+faststart',
  mp4Output,
]

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    const encoder = spawn(ffmpegPath, args, { stdio: 'inherit', windowsHide: true })
    encoder.once('error', (error) => {
      reject(new Error('Could not start FFmpeg. Set FFMPEG_PATH or add ffmpeg to PATH.', { cause: error }))
    })
    encoder.once('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`FFmpeg exited with code ${code}`))
    })
  })
}

await runFFmpeg(webmArgs)
console.log(`Created ${webmOutput}`)
await runFFmpeg(mp4Args)
console.log(`Created ${mp4Output}`)
