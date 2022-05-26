import * as React from 'react'
import { Box, styled as MuiStyled } from '@mui/material'
import Navigation from '../Navigation'

interface IHeaderCmsProps {
  listCategory: any
}

const WrapperNavigation = MuiStyled(Box)(({ theme }) => ({
  padding: '0px',
  rowGap: 16,
  position: 'relative',
  '& > ul.main > li': { width: '120px' },
  [theme.breakpoints.between('lg', 'xl')]: {
    '& > ul.main > li': { width: 'auto' },
    padding: '0px 8px',
  },
  [theme.breakpoints.up('xl')]: {
    '& > ul.main > li': { width: 'auto' },
    padding: '0px 16px',
    rowGap: 24,
  },
}))

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  overflow: 'scroll',
  padding: '16px 8px',
  [theme.breakpoints.up('lg')]: {
    overflow: 'hidden',
    padding: '16px 0px',
    alignItems: 'left',
  },
  width: '100%',
  background: '#fff',
  display: 'flex',
  flexDirection: 'row',
}))

const HeaderCms: React.FunctionComponent<IHeaderCmsProps> = (props) => {
  const { listCategory } = props

  return (
    <Wrapper>
      <WrapperNavigation>
        <Navigation items={listCategory} showActiveLink={true} variant="main" />
      </WrapperNavigation>
    </Wrapper>
  )
}

export default HeaderCms
