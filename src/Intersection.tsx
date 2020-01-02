import * as React from 'react'
import 'intersection-observer'
import styled, { css } from 'styled-components'

export enum IntersectClassName {
  BEFORE = 'intersect',
  AFTER = 'intersected'
}

export enum IntersectAnimation {
  FadeIn = 'fadeIn',
  SlideInFromRight = 'slideInFromRight',
  SlideInFromLeft = 'slideInFromLeft',
  SlideInFromBottom = 'slideInFromBottom'
}

interface IntersectFunction {
  (isIntersected: boolean): React.ReactNode
}

interface AnimationOption {
  type: IntersectAnimation
}

type Props = {
  children: React.ReactNode | IntersectFunction
  animationOption?: AnimationOption
}

/**
 * Intersection ObserverのWrapper
 *
 * A. このdivに.intersectedが付くので子要素でスタイルを充てる
 * B. 子要素に関数を渡してisIntersectedを受け取る
 * C. アニメーションを指定する
 */
export default function Intersection({
  children,
  animationOption
}: Props) {
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
    <Wrapper
      opt={animationOption}
      isIntersected={isIntersected}
      ref={ref}
      className={
        isIntersected
          ? IntersectClassName.AFTER
          : IntersectClassName.BEFORE
      }
    >
      {typeof children == 'function'
        ? children(isIntersected)
        : children}
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  opt?: AnimationOption
  isIntersected: boolean
}>`
  transition: all 0.5s ease;

  ${({ opt }) => {
    if (!opt) {
      return null
    }

    switch (opt.type) {
      case IntersectAnimation.FadeIn:
        return css<{ isIntersected: boolean }>`
          opacity: 0;
          will-change: opacity;

          ${({ isIntersected }) =>
            isIntersected &&
            css`
              opacity: 1;
            `}
        `

      case IntersectAnimation.SlideInFromRight:
        return css<{ isIntersected: boolean }>`
          opacity: 0;
          will-change: opacity, transform;
          transform: translate3D(200px, 0, 0);
          ${({ isIntersected }) =>
            isIntersected &&
            css`
              opacity: 1;
              transform: translate3D(0, 0, 0);
            `};
        `
      case IntersectAnimation.SlideInFromLeft:
        return css<{ isIntersected: boolean }>`
          opacity: 0;
          will-change: opacity, transform;
          transform: translate3D(-200px, 0, 0);
          ${({ isIntersected }) =>
            isIntersected &&
            css`
              opacity: 1;
              transform: translate3D(0, 0, 0);
            `};
        `
      case IntersectAnimation.SlideInFromBottom:
        return css<{ isIntersected: boolean }>`
          opacity: 0;
          will-change: opacity, transform;
          transform: translate3D(0, 200px, 0);
          ${({ isIntersected }) =>
            isIntersected &&
            css`
              opacity: 1;
              transform: translate3D(0, 0, 0);
            `};
        `
      default:
        return null
    }
  }}
`
