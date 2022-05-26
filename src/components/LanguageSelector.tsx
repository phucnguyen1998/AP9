/* eslint-disable @next/next/no-img-element */
import { Button, MenuItem, useTheme, Typography, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { StyledMenu } from './Navigation'

const langTexts: { [key: string]: string } = {
  vi: 'VN',
  en: 'EN',
}

const Wrapper = styled('div')(({ theme }) => ({
  padding: 0,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('xl')]: {
    padding: '0 16px',
  },
}))

const LangugeSelectButton = styled(Button)(({ theme }) => ({
  alignItems: 'center',
  height: 40,
  columnGap: 5,
  padding: 0,
  minWidth: 0,
  margin: '0 12px',
}))

const LanguageSelector = () => {
  const { locale, push, asPath } = useRouter()
  const langText = locale ? langTexts[locale] : ''
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const showOnlyFlag = useMediaQuery(theme.breakpoints.down('xl'))
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(wrapperRef?.current || null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = (lang: string) => (event: React.MouseEvent<HTMLElement>) => {
    push(asPath, asPath, { locale: lang })
    handleClose()
  }

  return (
    <Wrapper ref={wrapperRef}>
      <LangugeSelectButton
        onClick={handleClick}
        aria-controls="languages-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {!showOnlyFlag && (
          <>
            <Typography component={'div'} color={'textPrimary'}>
              {langText}
            </Typography>
            <Typography component={'div'} color={'textPrimary'}>
              -
            </Typography>
          </>
        )}
        <Image src={`/images/${locale}-flag.png`} alt={locale} width={36} height={36} />
      </LangugeSelectButton>
      <StyledMenu open={open} onClose={handleClose} id="languages-menu" anchorEl={anchorEl}>
        <MenuItem onClick={changeLanguage('vi')}>
          <div>Tiếng Việt</div>
          <Image src={`/images/vi-flag.png`} alt="vi" width={36} height={36} />
        </MenuItem>
        <MenuItem onClick={changeLanguage('en')}>
          <div>English</div>
          <Image src={`/images/en-flag.png`} alt="en" width={36} height={36} />
        </MenuItem>
      </StyledMenu>
    </Wrapper>
  )
}

export default LanguageSelector
