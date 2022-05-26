import { Close } from '@mui/icons-material'
import { Dialog, IconButton, styled as MuiStyled } from '@mui/material'
import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { closeAuthDialog } from '../../store/slices/layoutSlice'
import { ChangePassword } from './ChangePassword'
import { ForgotPassword } from './ForgotPassword'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { VerificationCode } from './VerificationCode'
import { RootState } from '../../store/store'
import { AUTH_FORMS } from '../../constants/common'
import { AuthState } from '../../store/slices/authSlice'

const StyledDialog = MuiStyled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .MuiDialog-container': {
      alignItems: 'flex-end',
    },
    '& .MuiPaper-root': {
      margin: 0,
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
    },
  },
}))

const AuthDialog = () => {
  const dispatch = useDispatch()
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const [showingForm, setShowingForm] = useState(authStore.hasAccount ? AUTH_FORMS.SIGNIN : AUTH_FORMS.SIGNUP)

  const [forgettingPasswordEmail, setForgettingPasswordEmail] = useState<string>('')
  const [changePasswordCode, setChangePasswordCode] = useState<any>('')

  const handleClose = () => {
    dispatch(closeAuthDialog())
  }

  //open Sign in form
  const handleShowSignInForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setShowingForm(AUTH_FORMS.SIGNIN)
  }

  //open Sign up form
  const handleShowSignUpForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setShowingForm(AUTH_FORMS.SIGNUP)
  }

  //open forgot password form
  const handleshowForgotPasswordForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setShowingForm(AUTH_FORMS.FORGOT_PASSWORD)
  }

  const onForgotPasswordSuccess = (email: string) => {
    setForgettingPasswordEmail(email)
    setShowingForm(AUTH_FORMS.VERIFY_CODE)
  }

  const onVerifyCodeSuccess = (code: string) => {
    setChangePasswordCode(code)
    setShowingForm(AUTH_FORMS.CHANGE_PASSWORD)
  }

  const renderAuthForm = () => {
    switch (showingForm) {
      case AUTH_FORMS.SIGNIN:
        return (
          <SignInForm
            handleShowSignUpForm={handleShowSignUpForm}
            showForgotPasswordForm={handleshowForgotPasswordForm}
          />
        )

      case AUTH_FORMS.FORGOT_PASSWORD:
        return <ForgotPassword onSuccess={onForgotPasswordSuccess} />

      case AUTH_FORMS.VERIFY_CODE:
        return <VerificationCode email={forgettingPasswordEmail} onSuccess={onVerifyCodeSuccess} />

      case AUTH_FORMS.CHANGE_PASSWORD:
        return <ChangePassword email={forgettingPasswordEmail} code={changePasswordCode} />

      default:
        return <SignUpForm handleShowSignInForm={handleShowSignInForm} />
    }
  }

  return (
    <StyledDialog open onClose={handleClose}>
      {renderAuthForm()}
      <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
        <Close />
      </IconButton>
    </StyledDialog>
  )
}

export default AuthDialog
