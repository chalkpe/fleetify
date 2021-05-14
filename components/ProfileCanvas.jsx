import React, { useRef, useEffect, useMemo } from 'react'

export default ({ url, color = '#00a3f9' }) => {
  const ref = useRef()
  const ctx = useMemo(() => ref.current?.getContext('2d'), [ref.current])

  useEffect(() => {
    if (!ctx) return

    const img = new Image()
    img.src = url
    img.onload = () => {
      ctx.canvas.width = ctx.canvas.height = img.width

      const big = 0.9
      const small = 0.85

      const xcenter = img.width / 2
      const rbig = (img.width * big) / 2
      const rsmall = (img.width * small) / 2
      const xsmall = (img.width * (1 - small)) / 2

      // border
      ctx.fillStyle = color
      ctx.fillRect(0, 0, img.width, img.width)

      // margin w/ border and pic
      ctx.beginPath()
      ctx.arc(xcenter, xcenter, rbig, 0, 2 * Math.PI, false)
      ctx.clip()
      ctx.clearRect(0, 0, img.width, img.width)

      // scaled pic
      ctx.beginPath()
      ctx.arc(xcenter, xcenter, rsmall, 0, 2 * Math.PI, false)
      ctx.clip()
      ctx.drawImage(img, xsmall, xsmall, rsmall * 2, rsmall * 2)
    }
  }, [url, ctx, color])

  return <canvas ref={ref} />
}
