import * as React from 'react'
import 'intersection-observer'

type Props = {
  children: React.ReactNode
}

export enum INTERSECT_CLASSNAME {
  BEFORE = 'intersect',
  AFTER = 'intersected'
}

/**
 * Intersection ObserverのWrapper
 *
 * このdivに.intersectedが付くので子要素でスタイルを充てる
 */
export default function Intersection({ children }: Props) {
  const [isIntersected, setIntersected] = React.useState(
    false
  )
  const ref = React.useRef<HTMLDivElement>(null)
  const callback = React.useCallback(
    (changes: IntersectionObserverEntry[]) => {
      changes.forEach(e => {
        if (e.isIntersecting) {
          setIntersected(true)
          observer.disconnect()
        }
      })
    },
    [isIntersected, setIntersected]
  )

  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '-200px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  })

  React.useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [callback])

  return (
    <div
      ref={ref}
      className={
        isIntersected
          ? INTERSECT_CLASSNAME.AFTER
          : INTERSECT_CLASSNAME.BEFORE
      }
    >
      {children}
    </div>
  )
}
