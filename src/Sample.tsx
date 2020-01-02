import * as React from 'react'
import styled from 'styled-components'
import Intersection from './Intersection'

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
  background: #faa;
  filter: hue-rotate(${({ i }) => i * 10}deg);
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
