/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from '@emotion/styled'

const Svg = styled.svg`
  width: ${({ width }) => (width || '24px')};
  height: ${({ height }) => (height || '24px')};
`

const LogoIcon = (props, { fill }) => (
  <Svg {...props}>
    <path d="M1 1H19V19H1V1ZM1 29H19V47H1V29ZM1 57H19V75H1V57ZM27 1H45V19H27V1ZM27 29H45V47H27V29ZM27 57H45V75H27V57ZM53 1H71V19H53V1ZM53 29H71V47H53V29Z" stroke={fill || '#EBDBB2'} strokeWidth="2" />
  </Svg>
)

const PlusIcon = (props, { fill }) => (
  <Svg {...props}>
    <path d="M9.5 0H13.5V23H9.5V0Z" fill={fill || '#EBDBB2'} />
    <path d="M23 9.5V13.5L0 13.5L1.74845e-07 9.5L23 9.5Z" fill={fill || '#EBDBB2'} />
  </Svg>
)

const ExpandIcon = (props, { fill }) => (
  <Svg {...props}>
    <path d="M8.10388 14.0422L3.341 18.7781L0 14.9828V25H10.3789L6.43012 21.7484L11.3539 17.1672L8.10388 14.0422ZM15.6211 0L19.5699 3.25156L14.6461 7.83281L17.8961 10.9578L22.659 6.22187L26 10.0172V0H15.6211Z" fill={fill || '#EBDBB2'} />
  </Svg>
)

const LeftAllowIcon = (props, { fill }) => (
  <Svg {...props}>
    <path
      d="M15 0V17L0 8.5L15 0Z"
      fill={fill || '#EBDBB2'}
    />
  </Svg>
)

const RightAllowIcon = (props, { fill }) => (
  <Svg {...props}>
    <path
      d="M14 8.5L0 17V0L14 8.5Z"
      fill={fill || '#EBDBB2'}
    />
  </Svg>
)

const ReloadIcon = (props, { fill }) => (
  <Svg {...props}>
    <path d="M5.66405 18.939C2.21602 15.2317 2.27699 9.42073 5.85917 5.8125C7.26308 4.39222 9.08855 3.46394 11.0632 3.16616L10.958 0C8.18594 0.334724 5.60871 1.59787 3.64584 3.58384C-1.15427 8.41616 -1.2122 16.2195 3.45835 21.1616L0.80449 23.8323L9.20355 24.2912L9.18068 15.3979L5.66405 18.939ZM15.7963 0.708842L15.8191 9.60213L19.3358 6.0625C22.7838 9.77287 22.7228 15.5838 19.1407 19.189C17.737 20.6097 15.9114 21.538 13.9366 21.8354L14.0418 25C16.8139 24.6649 19.3913 23.4024 21.3555 21.4177C26.1541 16.5823 26.212 8.77896 21.5415 3.83994L24.1953 1.16616L15.7963 0.708842Z" fill={fill || '#EBDBB2'} />
  </Svg>
)

const EllipsisIcon = (props, { fill }) => (
  <Svg {...props}>
    <path d="M2 8.5C2.82843 8.5 3.5 7.82843 3.5 7C3.5 6.17157 2.82843 5.5 2 5.5C1.17157 5.5 0.5 6.17157 0.5 7C0.5 7.82843 1.17157 8.5 2 8.5Z" fill={fill || '#EBDBB2'} />
    <path d="M2 13.5C2.82843 13.5 3.5 12.8284 3.5 12C3.5 11.1716 2.82843 10.5 2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5Z" fill={fill || '#EBDBB2'} />
    <path d="M2 3.5C2.82843 3.5 3.5 2.82843 3.5 2C3.5 1.17157 2.82843 0.5 2 0.5C1.17157 0.5 0.5 1.17157 0.5 2C0.5 2.82843 1.17157 3.5 2 3.5Z" fill={fill || '#EBDBB2'} />
  </Svg>
)

export default {
  LogoIcon,
  PlusIcon,
  ExpandIcon,
  LeftAllowIcon,
  RightAllowIcon,
  ReloadIcon,
  EllipsisIcon,
}
