import * as React from 'react'
import styled, { css } from 'styled-components'
import Intersection, {
  IntersectAnimation
} from './Intersection'

export default function() {
  return (
    <Wrapper>
      {Array(30)
        .fill(null)
        .map((_, i) => (
          <Intersection key={i}>
            <Item i={i}>Item {i}</Item>
          </Intersection>
        ))}
      <Intersection key={'q'}>
        {isIntersected => (
          <ItemWithFunc isIntersected={isIntersected}>
            ItemWithFunc
          </ItemWithFunc>
        )}
      </Intersection>
      <Intersection
        animationOption={{
          type: IntersectAnimation.FadeIn
        }}
      >
        <ItemStatic>FadeIn</ItemStatic>
      </Intersection>
      <Intersection
        animationOption={{
          type: IntersectAnimation.SlideInFromRight
        }}
      >
        <ItemStatic>SlideInFromRight</ItemStatic>
      </Intersection>
      <Intersection
        animationOption={{
          type: IntersectAnimation.SlideInFromBottom
        }}
      >
        <ItemStatic>SlideInFromBottom</ItemStatic>
      </Intersection>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 30px;
`

const Item = styled.div<{ i: number }>`
  font-size: 100px;
  height: 300px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: linear-gradient(-45deg, #0000ff, #ff9cff);
  filter: hue-rotate(${({ i }) => i * 30}deg);
  transition: transform 0.5s cubic-bezier(0, 0.8, 0.2, 1),
    opacity 0.5s ease;
  will-change: transform, opacity;

  .intersect > & {
    opacity: 0;
    transform: translate3d(0, 300px, 0);
  }

  .intersected > & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const ItemWithFunc = styled.div<{ isIntersected: boolean }>`
  font-size: 100px;
  height: 300px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: #faa;
  transition: transform 0.5s cubic-bezier(0, 0.8, 0.2, 1),
    opacity 0.5s ease;
  will-change: transform, opacity;

  ${({ isIntersected }) =>
    isIntersected
      ? css`
          opacity: 1;
          transform: translate3d(0, 0, 0);
        `
      : css`
          opacity: 0;
          transform: translate3d(300px, 0, 0);
        `}
`

const ItemStatic = styled.div`
  font-size: 100px;
  height: 300px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: #faa;
`
