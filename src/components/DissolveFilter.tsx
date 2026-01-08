import { onMount } from 'solid-js'

interface DissolveFilterProps {
  /** Optional custom ID for the filter. Defaults to 'dissolve-filter' */
  id?: string
}

export interface DissolveAnimation {
  /**
   * Triggers a dissolve animation on the target element
   * @param element - The HTML element to animate
   * @param onComplete - Optional callback fired when animation completes
   */
  dissolve: (element: HTMLElement, onComplete?: () => void) => void
}

let filterInstance: DissolveAnimation | null = null

/**
 * Gets the current DissolveFilter instance
 * @returns The DissolveAnimation instance or null if not mounted
 */
export function getDissolveFilter(): DissolveAnimation | null {
  return filterInstance
}

const easeInOutQuart = (x: number): number => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

export default function DissolveFilter(props: DissolveFilterProps) {
  const filterId = props.id || 'dissolve-filter'
  let turbulenceRef!: SVGFETurbulenceElement
  let displacementRef!: SVGFEDisplacementMapElement
  let isAnimating = false

  const dissolve = (element: HTMLElement, onComplete?: () => void) => {
    if (isAnimating) return

    isAnimating = true
    element.classList.add('dissolve-vanish')

    // Set random seed for variation
    turbulenceRef.setAttribute('seed', String(Math.floor(1000 * Math.random())))

    const duration = 1000
    const maxScale = 350
    let start: number | undefined

    const step = (timestamp: number) => {
      if (start === undefined) {
        start = timestamp
      }

      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const scale = easeInOutQuart(progress) * maxScale

      displacementRef.setAttribute('scale', String(scale))

      if (scale < maxScale) {
        requestAnimationFrame(step)
      } else {
        element.classList.remove('dissolve-vanish')
        displacementRef.setAttribute('scale', '0')
        isAnimating = false
        onComplete?.()
      }
    }

    requestAnimationFrame(step)
  }

  onMount(() => {
    filterInstance = { dissolve }
  })

  return (
    <>
      <style>
        {`
          .dissolve-vanish {
            animation: dissolve 0.8s cubic-bezier(0.12, 0, 0.39, 0);
            filter: url(#${filterId});
            opacity: 0;
          }

          @keyframes dissolve {
            0% {
              opacity: 1;
              transform: scaleX(1);
            }
            to {
              opacity: 0;
              transform: scale3d(1.2, 1.2, 1.2);
            }
          }
        `}
      </style>
      <svg
        class="pointer-events-none absolute"
        style="width: 0; height: 0; position: absolute;"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter
          id={filterId}
          x="-300%"
          y="-300%"
          width="600%"
          height="600%"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves={12}
            result="bigNoise"
            seed="5"
          />
          <feComponentTransfer
            in="bigNoise"
            result="bigNoiseAdjusted"
            color-interpolation-filters="sRGB"
          >
            <feFuncR type="linear" slope="2" intercept="-0.3" />
            <feFuncG type="linear" slope="2" intercept="-0.3" />
          </feComponentTransfer>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves={2}
            result="fineNoise"
          />
          <feMerge result="combinedNoise">
            <feMergeNode in="bigNoiseAdjusted" />
            <feMergeNode in="fineNoise" />
          </feMerge>
          <feDisplacementMap
            ref={displacementRef}
            in2="combinedNoise"
            in="SourceGraphic"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  )
}
