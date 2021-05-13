import React, { useRef, useEffect, useMemo } from 'react'

export default ({ url }) => {
  const ref = useRef()
  const ctx = useMemo(() => ref.current?.getContext('2d'), [ref.current])

  useEffect(() => {
    if (!ctx) return

    const img = new Image()
    img.src = url
    img.onload = () => {
      const x = img.width / 2
      const y = img.height / 2
      const radius = img.width * 0.9 / 2

      ctx.drawImage(img, 0, 0)
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
      ctx.clip()
      ctx.clearRect(
        x - radius - 1,
        y - radius - 1,
        radius * 2 + 2,
        radius * 2 + 2
      )
    }
  }, [url, ref.current])

  return <canvas ref={ref} width={400} height={400} />
}
