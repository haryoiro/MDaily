import React from 'react'
// import { ReactComponent as Pluss } from './Icons/Plus.svg'
import styled from 'styled-components'

// export default styled.svg.attrs`
//   width=24
//   height=24
//   viewBox=0 0 24 24"
//   fill=${props => props.fill ? props.fill : props.theme.fg1}
//   xmlns="http://www.w3.org/2000/svg"
// `

const Svg = styled.svg`
  width: 24px;
  height: 24px;
`

const Plus = ({ fill }) =>
    <Svg>
    <path d="M9.5 0H13.5V23H9.5V0Z"
      fill={fill ? fill : "#EBDBB2"} />
    <path d="M23 9.5V13.5L0 13.5L1.74845e-07 9.5L23 9.5Z"
      fill={fill ? fill : "#EBDBB2"} />
    </Svg>

const Expand = () =>
  <Svg>
    <path d="M8.10388 14.0422L3.341 18.7781L0 14.9828V25H10.3789L6.43012 21.7484L11.3539 17.1672L8.10388 14.0422ZM15.6211 0L19.5699 3.25156L14.6461 7.83281L17.8961 10.9578L22.659 6.22187L26 10.0172V0H15.6211Z" fill="#EBDBB2" />
  </Svg>

const LeftAllow = () =>
  <Svg>
    <path d="M15 0V17L0 8.5L15 0Z" fill="#EBDBB2" />
  </Svg>

export default {
  Plus,
  Expand,
  LeftAllow,
}