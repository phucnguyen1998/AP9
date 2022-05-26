import { Person, Search } from '@mui/icons-material'
import { TextField, Button, Drawer, useMediaQuery, useTheme, Divider, IconButton, MenuItem } from '@mui/material'
import { styled as MuiStyled } from '@mui/material/styles'
import Router from 'next/router'
import React, { Dispatch, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { HeaderMenu } from '../../constants/configs'
import { AuthState, SignedInUser, signout } from '../../store/slices/authSlice'
import { closeMobileMenu, LayoutState, openAuthDigalog } from '../../store/slices/layoutSlice'
import { RootState } from '../../store/store'
import { EKYCUnverifiedIcon, EKYCVerifiedIcon, MenuIcon, ProfileIcon, SecurityIcon, SignoutIcon } from '../AP9Icons'
import LanguageSelector from '../LanguageSelector'
import Logo from '../Logo'
import Navigation, { NavItemProps, StyledMenu } from '../Navigation'
import { KYC_STATUS } from '../../constants/common'
import { debounce } from 'lodash'

const HeaderContainer = MuiStyled('div')(({ theme }) => ({
  display: 'none',
  width: '100%',
  justifyContent: 'space-between',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexGrow: 1,
  },
}))

const LeftHeader = MuiStyled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
}))

const RightHeader = MuiStyled('div')(({ theme }) => ({
  justifyContent: 'flex-end',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
}))

const SearchInput = MuiStyled(TextField)(({ theme }) => ({
  width: 250,
  height: 40,
  margin: '0 24px',
  '& input': {
    padding: '8px 16px',
  },
  '& .MuiFilledInput-root': {
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main,
  },
  '& .MuiFilledInput-root:before, & .MuiFilledInput-root:after': {
    border: 'none !important',
  },

  [theme.breakpoints.between('lg', 'xl')]: {
    margin: '0 12px',
    width: 200,
  },
}))

const AuthButton = MuiStyled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 27,
  padding: '12px 24px',
  marginLeft: 12,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 1.5,
  [theme.breakpoints.up('xl')]: {
    marginLeft: 24,
  },
}))

const ProfileButtonWrapper = MuiStyled('div')({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
})

const StyledSearchIcon = MuiStyled(Search)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

const StyledDivider = MuiStyled(Divider)(({ theme }) => ({
  height: 40,
  color: '#ECECEE',
}))

interface ProfileMenuItemProps extends NavItemProps {
  icon?: JSX.Element
}

// Components for MobileMenu
const StyledDrawer = MuiStyled(Drawer)(({ theme }) => ({
  zIndex: 99999,
  '& .MuiBackdrop-root': {
    backgroundColor: theme.palette.text.secondary,
  },
}))

const MobileMenuWrapper = MuiStyled('div')({
  width: 240,
  paddingTop: 65,
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
})

const MobileMenuContainer = MuiStyled('div')({
  minHeight: '100%',
  maxHeight: '100%',
  position: 'relative',
  overflowY: 'auto',
  paddingBottom: 50,
})

const MobileMenuHeader = MuiStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  height: 65,
  minHeight: 65,
  alignItems: 'center',
  color: '#fff',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
}))

const MobileMenuLogoWrapper = MuiStyled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 1.5,
  padding: '12px 16px',
})

const MobileAuthButtonWrapper = MuiStyled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  marginTop: 16,
})

const MobileAuthButton = MuiStyled(Button)(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'none',
  padding: '8px 36px',
  fontSize: 16,
  lineHeight: 1.5,
  display: 'flex',
}))

const MobileUserMenuWrapper = MuiStyled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  padding: 0,
  listStyle: 'none',
  flexDirection: 'column',
  margin: 0,
}))
// End of components for MobileMenu

const renderKycIcon = (user: any) => {
  switch (user?.kycStatus) {
    case KYC_STATUS.UN_KYC:
      return <EKYCUnverifiedIcon sx={{ width: 20, color: '#C84040' }} />
    case KYC_STATUS.PENDING:
      return <EKYCVerifiedIcon sx={{ width: 20, color: '#E67337' }} />
    case KYC_STATUS.ACCEPT:
      return <EKYCVerifiedIcon sx={{ width: 20, color: '#3CA455' }} />
    case KYC_STATUS.REJECT:
      return <EKYCUnverifiedIcon sx={{ width: 20, color: '#C84040' }} />
    default:
      return <EKYCUnverifiedIcon sx={{ width: 20, color: '#C84040' }} />
  }
}

const renderKycStatus = (user: any) => {
  switch (user?.kycStatus) {
    case KYC_STATUS.UN_KYC:
      return 'profile_menu.ekyc_unverified'
    case KYC_STATUS.PENDING:
      return 'profile_menu.ekyc_pending'
    case KYC_STATUS.ACCEPT:
      return 'profile_menu.ekyc_verified'
    case KYC_STATUS.REJECT:
      return 'profile_menu.ekyc_rejected'
    default:
      return 'profile_menu.ekyc_unverified'
  }
}

const generateUserMenuConfigs = (user: SignedInUser | null, dispatch: Dispatch<any>) => {
  const profileMenu: ProfileMenuItemProps[] = [
    {
      link: '/user/ekyc',
      title: renderKycStatus(user),
      icon: renderKycIcon(user),
      onClick: (event: any) => {
        if (user?.kycStatus === KYC_STATUS.ACCEPT) {
          event.preventDefault()
        }
      },
    },
    {
      link: '/user/profile',
      title: 'profile_menu.profile',
      icon: <ProfileIcon sx={{ width: 20 }} />,
    },
    {
      link: '/user/change-password',
      title: 'profile_menu.security',
      icon: <SecurityIcon sx={{ width: 20, color: 'transparent' }} />,
    },
    {
      link: '/#',
      title: 'profile_menu.signout',
      icon: <SignoutIcon sx={{ width: 20 }} />,
      onClick: () => {
        dispatch(signout())
      },
    },
  ]

  return profileMenu
}

const DesktopMenu = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const { user, hasAccount } = authStore
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<HTMLDivElement | null>(null)
  const profileMenuWrapperRef = useRef<HTMLDivElement | null>(null)
  const [keyword, setKeyword] = useState('')

  const handleOpenAuthDialogClick = () => {
    dispatch(openAuthDigalog())
  }

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(profileMenuWrapperRef?.current)
  }

  const handleCloseProfileMenu = () => [setProfileMenuAnchorEl(null)]

  const handleProfileSubMenuClick = (profileMenuItem: NavItemProps) => (event: React.MouseEvent<HTMLElement>) => {
    handleCloseProfileMenu()
    const { onClick, link } = profileMenuItem
    if (typeof onClick === 'function') {
      onClick(event)
    } else if (link) {
      Router.push(link)
    }
  }

  const renderProfileMenu = () => {
    if (!user) {
      return (
        <AuthButton color="primary" variant="contained" onClick={handleOpenAuthDialogClick}>
          {t(`header.auth_button_${hasAccount ? 'signin' : 'signup'}`)}
        </AuthButton>
      )
    }

    const profileMenu = generateUserMenuConfigs(user, dispatch)

    return (
      <ProfileButtonWrapper ref={profileMenuWrapperRef}>
        <AuthButton color="primary" variant="contained" onClick={handleProfileMenuClick}>
          <Person />
          <MenuIcon sx={{ marginLeft: '12px' }} />
        </AuthButton>
        <StyledMenu
          id="profile-menu"
          open={Boolean(profileMenuAnchorEl)}
          anchorEl={profileMenuAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handleCloseProfileMenu}
        >
          {profileMenu.map((subItem: ProfileMenuItemProps, index: number) => (
            <MenuItem
              key={`profile-sub-menu-${index}`}
              onClick={handleProfileSubMenuClick(subItem)}
              sx={{ display: 'flex', columnGap: '12px', justifyContent: 'flex-start !important', padding: '10px' }}
            >
              {subItem.icon}
              <span>{t(subItem.title)}</span>
            </MenuItem>
          ))}
        </StyledMenu>
      </ProfileButtonWrapper>
    )
  }

  const search = async (keyword: any) => {
    // if (keyword.trim() === '') {Router.back()}
    Router.push(`/news/search?keyword=${keyword}`)
  }

  const debounceSearch = useCallback(
    debounce((nextValue) => search(nextValue), 1000),
    []
  )

  const handleInputChange = (e: any) => {
    const { value } = e.target
    setKeyword(value)
    debounceSearch(value)
  }

  return (
    <HeaderContainer>
      <LeftHeader>
        <Navigation items={HeaderMenu} variant="main" />
      </LeftHeader>
      <RightHeader>
        <SearchInput
          variant="filled"
          InputProps={{ startAdornment: <StyledSearchIcon /> }}
          onChange={handleInputChange}
          placeholder={t('header.search_placeholder')}
        />
        <StyledDivider orientation="vertical" />
        <LanguageSelector />
        <StyledDivider orientation="vertical" />
        {renderProfileMenu()}
      </RightHeader>
    </HeaderContainer>
  )
}

const MobileMenu = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const layoutStore: LayoutState = useSelector((store: RootState) => store, shallowEqual).layout
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const { user, hasAccount } = authStore

  const handleClose = () => {
    dispatch(closeMobileMenu())
  }

  const handleSignUpButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(closeMobileMenu())
    dispatch(openAuthDigalog())
  }

  const handleProfileSubMenuClick = (profileMenuItem: NavItemProps) => (event: React.MouseEvent<HTMLElement>) => {
    handleClose()
    const { onClick, link } = profileMenuItem
    if (typeof onClick === 'function') {
      onClick(event)
    } else if (link) {
      Router.push(link)
    }
  }

  const renderUserMenu = () => {
    if (user) {
      const profileMenu = generateUserMenuConfigs(user, dispatch)
      return (
        <MobileUserMenuWrapper>
          {profileMenu.map((subItem: ProfileMenuItemProps, index: number) => (
            <MenuItem
              key={`profile-sub-menu-${index}`}
              onClick={handleProfileSubMenuClick(subItem)}
              sx={{
                display: 'flex',
                columnGap: '12px',
                justifyContent: 'flex-start !important',
                padding: '10px',
                width: '100%',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              }}
            >
              {subItem.icon}
              <span>{t(subItem.title)}</span>
            </MenuItem>
          ))}
        </MobileUserMenuWrapper>
      )
    }

    return (
      <MobileAuthButtonWrapper>
        <MobileAuthButton color="primary" variant="contained" onClick={handleSignUpButtonClick}>
          {t(`header.auth_button_${hasAccount ? 'signin' : 'signup'}`)}
        </MobileAuthButton>
      </MobileAuthButtonWrapper>
    )
  }

  return (
    <StyledDrawer open={layoutStore.showingMobileMenu} onClose={handleClose}>
      <MobileMenuWrapper>
        <MobileMenuHeader>
          <IconButton sx={{ zIndex: 999, marginLeft: '12px' }}>
            <MenuIcon sx={{ color: '#fff' }} />
          </IconButton>
          <MobileMenuLogoWrapper>
            <Logo size="small" />
          </MobileMenuLogoWrapper>
        </MobileMenuHeader>
        <MobileMenuContainer>
          <div>
            <Navigation items={HeaderMenu} variant="main" orientation="vertical" />
            <Divider />
            {renderUserMenu()}
          </div>
        </MobileMenuContainer>
      </MobileMenuWrapper>
    </StyledDrawer>
  )
}

const MainMenu = () => {
  const theme = useTheme()
  const showDesktopMenu = useMediaQuery(theme.breakpoints.up('lg'))
  return showDesktopMenu ? <DesktopMenu /> : <MobileMenu />
}

export default MainMenu
