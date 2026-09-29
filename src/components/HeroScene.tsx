import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const renderQuery = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

function canRenderScene() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(renderQuery).matches
}

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(canRenderScene)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const preference = window.matchMedia(renderQuery)
    const updatePreference = () => setEnabled(preference.matches)

    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!enabled || !host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      // The portrait remains the complete Hero on devices without WebGL.
      return
    }

    renderer.setClearAlpha(0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = 10

    const sculpture = new THREE.Group()
    scene.add(sculpture)

    const gold = new THREE.MeshPhysicalMaterial({
      color: 0xc9ad80,
      metalness: 0.72,
      roughness: 0.32,
      clearcoat: 0.45,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const smoke = new THREE.MeshPhysicalMaterial({
      color: 0x929392,
      metalness: 0.66,
      roughness: 0.38,
      clearcoat: 0.28,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const trace = new THREE.MeshPhysicalMaterial({
      color: 0xd2bea0,
      metalness: 0.55,
      roughness: 0.3,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
      side: THREE.DoubleSide,
    })

    const outerGeometry = new THREE.TorusGeometry(2.16, 0.105, 16, 112)
    const innerGeometry = new THREE.TorusGeometry(1.57, 0.16, 18, 112)
    const traceGeometry = new THREE.TorusGeometry(2.58, 0.018, 8, 112)

    const outer = new THREE.Mesh(outerGeometry, gold)
    outer.rotation.set(0.58, -0.54, 0.22)
    const inner = new THREE.Mesh(innerGeometry, smoke)
    inner.rotation.set(-0.45, 0.43, -0.48)
    inner.position.z = 0.2
    const orbit = new THREE.Mesh(traceGeometry, trace)
    orbit.rotation.set(-0.18, 0.62, 0.44)
    orbit.position.z = -0.35
    sculpture.add(outer, inner, orbit)

    scene.add(new THREE.HemisphereLight(0xe7d6bc, 0x14181c, 2.2))
    const keyLight = new THREE.DirectionalLight(0xffe7bd, 3.6)
    keyLight.position.set(-3, 4, 5)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0xb4bfcb, 2.1)
    rimLight.position.set(4, -2, -1)
    scene.add(rimLight)

    let frameId: number | null = null
    let isInView = false
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0

    const renderFrame = (time: number) => {
      frameId = null
      easedX += (pointerX - easedX) * 0.035
      easedY += (pointerY - easedY) * 0.035
      sculpture.rotation.y = Math.sin(time * 0.00014) * 0.1 + easedX
      sculpture.rotation.x = Math.sin(time * 0.00011) * 0.045 + easedY
      sculpture.rotation.z = Math.sin(time * 0.00008) * 0.025
      renderer.render(scene, camera)
      if (isInView && !document.hidden) frameId = window.requestAnimationFrame(renderFrame)
    }

    const updatePlayback = () => {
      if (isInView && !document.hidden) {
        if (frameId === null) frameId = window.requestAnimationFrame(renderFrame)
      } else if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    const resize = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(width, height, false)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.18
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.12
    }

    const finePointer = window.matchMedia('(pointer: fine)')
    const updatePointerListener = () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (finePointer.matches) {
        window.addEventListener('pointermove', onPointerMove, { passive: true })
      } else {
        pointerX = 0
        pointerY = 0
      }
    }

    const intersectionObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        isInView = entry.isIntersecting
        updatePlayback()
      }, { threshold: 0.01 })
    if (intersectionObserver) {
      intersectionObserver.observe(host)
    } else {
      isInView = true
    }

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(resize)
    resizeObserver?.observe(host)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', updatePlayback)
    finePointer.addEventListener('change', updatePointerListener)
    updatePointerListener()
    resize()
    updatePlayback()

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      intersectionObserver?.disconnect()
      resizeObserver?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', updatePlayback)
      finePointer.removeEventListener('change', updatePointerListener)
      outerGeometry.dispose()
      innerGeometry.dispose()
      traceGeometry.dispose()
      gold.dispose()
      smoke.dispose()
      trace.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[52%] opacity-70"
    />
  )
}
