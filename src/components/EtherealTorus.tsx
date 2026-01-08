import { onCleanup, onMount } from 'solid-js'

interface ParticleProps {
  u: number
  v: number
  R: number
  r: number
  size: number
  opacity: number
  speed: number
  phase: number
  x: number
  y: number
  displaySize: number
  displayOpacity: number
}

const EtherealTorus = () => {
  let canvasRef: HTMLCanvasElement | undefined

  onMount(() => {
    const canvas = canvasRef
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 550
    canvas.height = 550

    ctx.fillStyle = '#f0ede8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const particles: Array<Particle> = []
    const numParticles = 1000
    let time = 0

    class Particle implements ParticleProps {
      u: number
      v: number
      R: number
      r: number
      size: number
      opacity: number
      speed: number
      phase: number
      x: number
      y: number
      displaySize: number
      displayOpacity: number

      constructor() {
        this.u = 0
        this.v = 0
        this.R = 0
        this.r = 0
        this.size = 0
        this.opacity = 0
        this.speed = 0
        this.phase = 0
        this.x = 0
        this.y = 0
        this.displaySize = 0
        this.displayOpacity = 0
        this.reset()
      }

      reset() {
        this.u = Math.random() * Math.PI * 2
        this.v = Math.random() * Math.PI * 2
        this.R = 150
        this.r = 60 + Math.random() * 30
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.speed = Math.random() * 0.001875 + 0.0005
        this.phase = Math.random() * Math.PI * 2
      }

      update() {
        this.u += this.speed

        const breathingFactor = Math.sin(time + this.phase) * 0.0475
        this.r += breathingFactor

        const x = (this.R + this.r * Math.cos(this.v)) * Math.cos(this.u)
        const y = (this.R + this.r * Math.cos(this.v)) * Math.sin(this.u)
        const z = this.r * Math.sin(this.v)

        const scale = 1000 / (1000 + z)

        if (canvas) {
          this.x = x * scale + canvas.width / 2
          this.y = y * scale + canvas.height / 2
        }
        this.displaySize = this.size * scale
        this.displayOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.u))
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(40, 40, 40, ${this.displayOpacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.displaySize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle())
    }

    let lastFrameTime = 0
    const targetFPS = 20
    const frameInterval = 1000 / targetFPS
    let animationFrameId: number | null = null

    function animate(currentTime: number) {
      if (!lastFrameTime) {
        lastFrameTime = currentTime
      }

      const deltaTime = currentTime - lastFrameTime

      if (deltaTime >= frameInterval && ctx && canvas) {
        ctx.fillStyle = 'rgba(240, 237, 232, 0.30)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        time += 0.004

        particles.forEach((particle) => {
          particle.update()
          particle.draw()
        })

        lastFrameTime = currentTime - (deltaTime % frameInterval)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    onCleanup(() => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.length = 0
    })
  })

  return (
    <div
      style={{
        width: '550px',
        height: '550px',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default EtherealTorus
