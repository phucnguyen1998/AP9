import styled from '@emotion/styled'
import { CssBaseline, styled as MuiStyled, Theme } from '@mui/material'
import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import URLs from '../../constants/URLs'
import { useApiRequest } from '../../hooks/useApiRequest'
import { AuthState, getProfileSuccess, signinSuccess } from '../../store/slices/authSlice'
import { LayoutState } from '../../store/slices/layoutSlice'
import { RootState } from '../../store/store'
import AuthDialog from '../AuthDialog'
import FormTransferMoney from '../pages/wallet/ModalTransferMoney'
import ViewGuideDialog from './../pages/user/ViewGuideDialog'
import Footer from './Footer'
import Header from './Header'
import { Container } from './styled'

const PageWapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = MuiStyled('div')((style: { theme: Theme }) => ({
  minHeight: '100%',
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  marginTop: 65,
  maxWidth: '100%',
  minWidth: '100%',
  backgroundColor: style.theme.palette.secondary.main,
  [style.theme.breakpoints.up('lg')]: {
    backgroundColor: 'transparent',
  },
}))

const Layout = (props: any) => {
  const layoutStore: LayoutState = useSelector((store: RootState) => store, shallowEqual).layout
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const dispatch = useDispatch()
  const { accessToken } = authStore
  const { data, mutate } = useApiRequest({ url: URLs.AUTH_GET_PROFILE, method: 'GET', accessToken })

  useEffect(() => {
    if (accessToken) {
      mutate()
    }
  }, [accessToken])

  useEffect(() => {
    if (data?.data) {
      dispatch(getProfileSuccess(data.data))
    }
  }, [data, dispatch])

  return (
    <PageWapper>
      <CssBaseline />
      <Header />
      <Container>
        <Content>{props.children}</Content>
      </Container>
      <Footer />
      {layoutStore.showingAuthDigalog && <AuthDialog />}
      {layoutStore.showingViewGuideDialog && <ViewGuideDialog />}
      {layoutStore.showingFormTransferMoney && <FormTransferMoney />}
    </PageWapper>
  )
}

export default Layout
