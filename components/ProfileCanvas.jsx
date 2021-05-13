import React, { useState, useRef, useEffect, useMemo } from 'react'

export default ({ url }) => {
  const ref = useRef()
  const [image, setImage] = useState(null)
  const ctx = useMemo(() => ref.current?.getContext('2d'), [ref])

  useEffect(() => {
    const img = new Image()
    img.src = url
    img.onload = () => setImage(img)
  }, [url])

  useEffect(() => {
    if (!ctx) return
    if (!image) return

    const x = image.width / 2
    const y = image.height / 2
    const radius = image.width / 4

    ctx.drawImage(image, 0, 0)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    ctx.clip()
    ctx.clearRect(
      x - radius - 1,
      y - radius - 1,
      radius * 2 + 2,
      radius * 2 + 2
    )
  }, [ctx, image])

  return <canvas ref={ref} width={image?.width} height={image?.height} />
}
