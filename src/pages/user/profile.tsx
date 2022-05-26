import { Container } from '@mui/material'
import * as React from 'react'
import { AP9_THEME } from '../../constants/theme'
import UserProfile from './../../components/pages/user/UserProfile'
import { styled as MuiStyled } from '@mui/material/styles'
import withAuth from '../../components/withAuth'

interface ProfileProps {}

const ContainerWrapper = MuiStyled(Container)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  padding: '12px 0px 24px 0px',
  position: 'relative',
  backgroundColor: AP9_THEME.palette.background.paper,

  [theme.breakpoints.up('lg')]: {
    display: 'block',
    marginTop: '24px',
    marginBottom: '24px',
    padding: 0,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
}))

const Profile: React.FunctionComponent<ProfileProps> = (props) => {
  return (
    <ContainerWrapper>
      <UserProfile />
    </ContainerWrapper>
  )
}

export default withAuth(Profile)
