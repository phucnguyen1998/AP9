import { IconButton, styled as MuiStyled, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { openMobileMenu } from '../../store/slices/layoutSlice'
import { MenuIcon } from '../AP9Icons'
import LanguageSelector from '../LanguageSelector'
import Logo from '../Logo'
import MainMenu from './MainMenu'
import { Container } from './styled'

const Wrapper = MuiStyled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: 65,
  boxSizing: 'border-box',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  backgroundColor: theme?.palette?.primary?.main,
  zIndex: 1000,
  padding: '0 16px',
  position: 'fixed',
  justifyContent: 'center',

  [theme.breakpoints.up('lg')]: {
    backgroundColor: '#fff',
  },
}))

const LogoWrapper = MuiStyled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    width: 'auto',
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    marginRight: 16,
  },
  [theme.breakpoints.up('xl')]: {
    marginRight: 60,
  },
}))

const HomeLink = MuiStyled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  [theme.breakpoints.up('lg')]: {
    color: theme.palette.text.primary,
    position: 'relative',
  },
}))

const MobileMenuButton = MuiStyled(IconButton)(({ theme }) => ({
  zIndex: 9,
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

const Header = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleMobileMenuClick = () => {
    dispatch(openMobileMenu())
  }

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <MobileMenuButton onClick={handleMobileMenuClick}>
            <MenuIcon sx={{ color: '#fff' }} />
          </MobileMenuButton>
          <Link href={'/'} passHref>
            <HomeLink>
              <Logo size="small" />
            </HomeLink>
          </Link>
          {isMobile && <LanguageSelector />}
        </LogoWrapper>
        <MainMenu />
      </Container>
    </Wrapper>
  )
}

export default Header
