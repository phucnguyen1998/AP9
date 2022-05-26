/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import {
  MenuItem,
  Typography,
  styled as MuiStyled,
  Menu,
  MenuProps,
  alpha,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { closeMobileMenu } from '../store/slices/layoutSlice'
import { isOnMobileBrowser } from '../utils/common'

export interface NavItemProps {
  title: string
  link?: any
  subMenu?: NavItemProps[]
  showActiveLink?: Boolean
  variant?: string
  orientation?: 'horizontal' | 'vertical'
  icon?: JSX.Element
  onClick?: (event?: any) => void
}

export interface NavigationProps {
  items: NavItemProps[]
  showActiveLink?: Boolean
  variant?: 'policy' | 'footer' | 'main'
  orientation?: 'horizontal' | 'vertical'
}

export const StyledMenu = MuiStyled(
  React.forwardRef((props: MenuProps, ref: any) => (
    <Menu
      ref={ref}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))
)(({ theme }) => ({
  zIndex: 998,
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: 0,
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],

    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      justifyContent: 'space-between',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))

const NavWrapper = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    height: 100%;

    a {
      display: inline-block;
    }
  }

  &.main {
    li {
      a {
        padding: 8px;

        @media (min-width: 1200px) {
          padding: 8px 16px;
        }
      }
    }
  }

  &.footer {
    li {
      a {
        padding: 0 20px;
      }

      &:first-of-type a {
        padding-left: 0;
      }
    }
  }

  &.policy {
    li {
      border-right: 1px solid rgba(17, 15, 36, 0.4);
      padding: 0 12px;

      &:first-of-type {
        padding-left: 0;
      }

      a p {
        color: rgba(17, 15, 36, 0.4);
        font-size: 12px;
        line-height: 24px;
      }
    }
  }

  &.vertical {
    flex-direction: column;

    li {
      width: 100%;
      flex-direction: column;
      a {
        padding: 8px 16px;
        display: flex !important;
        width: 100%;
      }
    }
  }
`

const MenuLink = MuiStyled('a')(({ theme }) => ({
  textDecoration: 'none',
  display: 'inline-flex !important',

  '&.active.mobile': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

export const StyledMenuItem = MuiStyled(MenuItem)(({ theme }) => ({
  '&.Mui-focusVisible': {
    backgroundColor: 'transparent',
  },
  '&:hover': {
    backgroundColor: `${theme.palette.secondary.main} !important`,
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}))

export const VerticalSubmenu = MuiStyled('ul')(({ theme }) => ({
  padding: 0,
  width: '100%',
  boxSizing: 'border-box',

  '& li': {
    height: 'auto',
  },
  '& li a': {
    paddingLeft: '32px !important',
  },
}))

export const NavItem = (props: NavItemProps) => {
  const { t } = useTranslation()
  const { title, link, showActiveLink, subMenu, variant, orientation, icon } = props
  const theme = useTheme()
  const isMobileMenu = useMediaQuery(theme.breakpoints.down('lg'))
  const router = useRouter()
  const { asPath } = router
  let isActiveLink = showActiveLink === true && asPath === link

  if (subMenu?.length) {
    subMenu.forEach((item) => {
      if (showActiveLink && asPath === item.link) {
        isActiveLink = true
      }
    })
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const subMenuRef = useRef<HTMLDivElement | null>(null)
  const itemRef = useRef<HTMLLIElement | null>(null)
  const [expandingSubmenu, setExpandingSubmenu] = useState(isActiveLink && orientation === 'vertical')

  const dispatch = useDispatch()
  const onMobileBrowser = isOnMobileBrowser()

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!isMobileMenu) {
      setAnchorEl(event.currentTarget)
      setExpandingSubmenu(true)
    }
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    if (subMenu?.length && (onMobileBrowser || isMobileMenu) && !expandingSubmenu) {
      event.preventDefault()
      setExpandingSubmenu(true)
    } else {
      dispatch(closeMobileMenu())
    }
  }

  useEffect(() => {
    const onMouseMove = (event: any) => {
      if (anchorEl && !isMobileMenu) {
        const subMenuEl = subMenuRef?.current?.getElementsByClassName('MuiPaper-root')[0]
        if (!subMenuEl?.contains(event.target) && !itemRef?.current?.contains(event.target)) {
          setExpandingSubmenu(false)
        }
      }
    }

    if (subMenu?.length) {
      window.addEventListener('mousemove', onMouseMove)
      return () => {
        window.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [anchorEl, itemRef, subMenuRef, isMobileMenu, subMenu])

  const menuLinkClasses = isActiveLink ? ['active'] : []
  if (isMobileMenu) {
    menuLinkClasses.push('mobile')
  }

  if (subMenu?.length) {
    const handleSubmenuItemClick = (submenuItem: NavItemProps) => () => {
      setExpandingSubmenu(false)
      router.push(submenuItem.link, submenuItem.link)
    }

    const renderSubMenu = () => {
      if (orientation === 'horizontal') {
        return (
          <StyledMenu
            id={`variant-${title}`}
            open={expandingSubmenu}
            anchorEl={anchorEl}
            ref={subMenuRef}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {subMenu.map((subItem: NavItemProps, index: number) => (
              <StyledMenuItem
                key={`sub-menu-${variant}-${title}-${index}`}
                onClick={handleSubmenuItemClick(subItem)}
                className={subItem.link === asPath ? 'active' : ''}
              >
                {t(subItem.title)}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        )
      }
      return (
        <Collapse in={expandingSubmenu} sx={{ width: '100%' }}>
          <VerticalSubmenu>
            {subMenu.map((subItem: NavItemProps, index: number) => (
              <NavItem {...subItem} key={`submenu-item-${subItem.title}-${index}`} showActiveLink={showActiveLink} />
            ))}
          </VerticalSubmenu>
        </Collapse>
      )
    }

    return (
      <li onMouseEnter={handleMouseEnter} aria-controls={`variant-${title}`} ref={itemRef}>
        <Link href={link} passHref>
          <MenuLink href={link} onClick={handleMenuItemClick} className={menuLinkClasses.join(' ')}>
            <Typography
              color={isActiveLink && !isMobileMenu ? 'primary' : 'textPrimary'}
              fontWeight={isMobileMenu ? 600 : isActiveLink ? 700 : 400}
              textAlign={'center'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
              component="div"
            >
              <span>{t(title)}</span>
              {expandingSubmenu ? (
                <KeyboardArrowUp sx={{ marginLeft: '8px' }} />
              ) : (
                <KeyboardArrowDown sx={{ marginLeft: '8px' }} />
              )}
            </Typography>
          </MenuLink>
        </Link>
        {renderSubMenu()}
      </li>
    )
  }

  return (
    <li>
      <Link href={link} passHref>
        <MenuLink href={link} className={menuLinkClasses.join(' ')} onClick={handleMenuItemClick}>
          <Typography
            color={isActiveLink && !isMobileMenu ? 'primary' : 'textPrimary'}
            fontWeight={isMobileMenu ? 600 : isActiveLink ? 700 : 400}
            component="div"
            sx={{ display: 'flex', columnGap: '8px' }}
          >
            {icon}
            <span>{t(title)}</span>
          </Typography>
        </MenuLink>
      </Link>
    </li>
  )
}

const Navigation = (props: NavigationProps) => {
  const { items, showActiveLink, variant, orientation } = props
  return (
    <NavWrapper className={[variant, orientation].join(' ')}>
      {items.map((item: NavItemProps, index: number) => (
        <NavItem
          {...item}
          key={`${variant}-nav-item-${item.link}-${index}`}
          showActiveLink={showActiveLink}
          variant={variant}
          orientation={orientation}
        />
      ))}
    </NavWrapper>
  )
}

Navigation.defaultProps = {
  showActiveLink: true,
  variant: 'main',
  orientation: 'horizontal',
}

export default Navigation
