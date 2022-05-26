/* eslint-disable react/display-name */
import styled from '@emotion/styled'
import { styled as MuiStyled } from '@mui/material'
import React from 'react'

export interface LogoProps {
  size?: 'small' | 'large'
}

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SiteName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin: 0 0 0 8px;

  &.large {
    font-size: 32px;
    line-height: 48px;
    margin-left: 12px;
  }
`

const ImageWrapper = MuiStyled('div')(({ theme }) => ({
  '& svg': {
    width: '100%',
  },
  '& path': {
    fill: 'currentColor',
  },
  display: 'flex',
  alignItems: 'center',
  width: 16,

  '&.large': {
    width: 43,
  },
}))

const LogoIcon = (props: any) => {
  return (
    <ImageWrapper {...props}>
      <svg viewBox="0 0 43 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.4995 0L0 21.6224L8.33228 30L21.5005 16.7581L34.6677 30L43 21.6224L21.4995 0Z"
          fill="#110F24"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 42.4995L21.5 64L43 42.4995L21.5 21L0 42.4995Z"
          fill="#110F24"
        />
      </svg>
    </ImageWrapper>
  )
}

const Logo = React.forwardRef((props: LogoProps, ref: any) => {
  const { size } = props
  return (
    <LogoWrapper ref={ref}>
      <LogoIcon className={size} />
      <SiteName className={size}>AP9</SiteName>
    </LogoWrapper>
  )
})

Logo.defaultProps = {
  size: 'small',
}

export default Logo
