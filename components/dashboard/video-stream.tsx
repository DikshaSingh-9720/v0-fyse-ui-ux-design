"use client"

import { useEffect, useRef } from "react"

interface VideoStreamProps {
  userName: string
  userInitial: string
  isLocal?: boolean
  isVideoOn: boolean
}

export default function VideoStream({ userName, userInitial, isLocal = false, isVideoOn }: VideoStreamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isVideoOn || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const animate = () => {
      const width = canvas.width
      const height = canvas.height
      const time = Date.now() / 1000

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, `hsl(${(time * 30) % 360}, 70%, 60%)`)
      gradient.addColorStop(1, `hsl(${(time * 30 + 120) % 360}, 70%, 50%)`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw animated particles
      for (let i = 0; i < 5; i++) {
        const x = (width / 5) * i + Math.sin(time + i) * 20
        const y = height / 2 + Math.cos(time + i) * 20
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`
        ctx.beginPath()
        ctx.arc(x, y, 10 + Math.sin(time + i) * 5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw user indicator
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
      ctx.fillRect(0, height - 60, width, 60)
      ctx.fillStyle = "white"
      ctx.font = "bold 24px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(userName, width / 2, height - 20)

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [isVideoOn, userName])

  if (!isVideoOn) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${isLocal ? "rounded-2xl" : ""}`}
      >
        <div className="text-center">
          <div
            className={`${isLocal ? "w-24 h-24" : "w-32 h-32"} rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center ${isLocal ? "text-3xl" : "text-6xl"} text-white font-bold`}
          >
            {userInitial}
          </div>
          <p className={`text-white ${isLocal ? "text-sm" : "text-2xl"} font-semibold`}>{userName}</p>
          <p className={`text-white/60 ${isLocal ? "text-xs" : "text-base"} mt-1`}>Camera Off</p>
        </div>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      width={1280}
      height={720}
      className={`w-full h-full object-cover ${isLocal ? "rounded-2xl" : ""}`}
    />
  )
}
