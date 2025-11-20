import { useEffect, useRef } from 'react'

export default function MinimalCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let ox = x
    let oy = y

    const onMove = (e) => {
      x = e.clientX; y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`
    }

    const raf = () => {
      ox += (x - ox) * 0.12
      oy += (y - oy) * 0.12
      outline.style.transform = `translate(${ox}px, ${oy}px)`
      requestAnimationFrame(raf)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, .hoverable, input, textarea')) {
        outline.classList.add('outline')
      } else {
        outline.classList.remove('outline')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={outlineRef} className="custom-cursor" />
    </>
  )
}
