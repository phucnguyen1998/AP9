import { Container } from '@mui/material'
import ChangePasswordComponent from '../../components/pages/change-password'
import withAuth from '../../components/withAuth'
import { AP9_THEME } from '../../constants/theme'

const ChangePassword = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 3, marginBottom: 3, background: AP9_THEME.palette.background.paper }}>
      <ChangePasswordComponent />
    </Container>
  )
}
export default withAuth(ChangePassword)
