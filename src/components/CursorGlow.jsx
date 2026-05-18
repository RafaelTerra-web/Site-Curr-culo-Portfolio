import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const glowRef2 = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Disable on touch/coarse devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const glow = glowRef.current
    if (!glow) return

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const animate = () => {
      const current = glowRef2.current
      const target = mouseRef.current
      const ease = 0.12

      current.x += (target.x - current.x) * ease
      current.y += (target.y - current.y) * ease

      if (glow) {
        glow.style.left = current.x + 'px'
        glow.style.top = current.y + 'px'
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'radial-gradient(circle, rgba(30, 58, 95, 0.04) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
        opacity: 0,
      }}
    />
  )
}
