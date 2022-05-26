/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Link as MuiLink, Container, FormControlLabel, Checkbox } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import { signInSchema } from './validateSchema'
import FormInput from './FormInput'
import FormInputPassword from '../FormInputPassword'
import AuthButton from './AuthButton'
import TextWithLink from './TextWithLink'
import BaseForm from '../BaseForm'
import { AP9_THEME } from '../../constants/theme'
import { useApiRequest } from '../../hooks/useApiRequest'
import URLs from '../../constants/URLs'
import Loader from '../Loader'
import { AuthState, signinSuccess } from '../../store/slices/authSlice'
import { closeAuthDialog } from '../../store/slices/layoutSlice'
import { RootState } from '../../store/store'

interface Props {
  handleShowSignUpForm: (event: React.MouseEvent<HTMLAnchorElement>) => any
  showForgotPasswordForm: (event: React.MouseEvent<HTMLAnchorElement>) => any
}

export const SignInForm = ({ handleShowSignUpForm, showForgotPasswordForm }: Props) => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [typeInput, setTypeInput] = useState(false)
  const [signinData, setSigninData] = useState<any>(null)
  const [submitting, setSubmitting] = useState<Boolean>(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const { user: signedInUser } = authStore
  const { t } = useTranslation()

  const {
    data: signinResponse,
    error: signinError,
    isValidating,
    mutate: mutateSignIn,
  } = useApiRequest(
    { url: `${URLs.AUTH_SIGNIN}`, method: 'POST', data: signinData },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
    }
  )

  useEffect(() => {
    if (signinResponse) {
      dispatch(signinSuccess(signinResponse))
    } else if (signinError) {
      enqueueSnackbar(t('auth.sign_in.sign_in_failed'), { variant: 'error' })
      setSubmitting(false)
    }
  }, [signinResponse, signinError, enqueueSnackbar, t, dispatch])

  useEffect(() => {
    signinData && mutateSignIn()
  }, [signinData, mutateSignIn])

  useEffect(() => {
    if (signedInUser) {
      enqueueSnackbar(t('auth.sign_in.sign_in_success'), { variant: 'success' })
      dispatch(closeAuthDialog())
    }
  }, [signedInUser, dispatch, enqueueSnackbar, t])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
    setTypeInput(!typeInput)
  }

  const onSubmit = (values: any) => {
    setSubmitting(true)
    let data = {
      email: values.emailOrPhoneNumber,
      password: values.password,
    }
    setSigninData(data)
  }

  return (
    <>
      <Container
        component="main"
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Formik
            initialValues={{ emailOrPhoneNumber: '', password: '', rememberMe: false }}
            onSubmit={onSubmit}
            validationSchema={signInSchema(t)}
          >
            {(properties: any) => {
              const { touched, errors, handleSubmit, handleChange, handleBlur } = properties
              return (
                <BaseForm label={t('auth.sign_in.label')} onSubmit={handleSubmit}>
                  <Grid container>
                    <FormInput
                      require={true}
                      label={t('auth.sign_in.email_or_phone')}
                      size={'small'}
                      value={emailOrPhoneNumber}
                      name={'emailOrPhoneNumber'}
                      placeholder={`${t('auth.sign_in.email_or_phone')} *`}
                      onChange={(e: any) => {
                        setEmailOrPhoneNumber(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.emailOrPhoneNumber}
                      touched={touched}
                    />

                    <FormInputPassword
                      require={true}
                      label={t('auth.sign_in.password')}
                      size={'small'}
                      value={password}
                      name={'password'}
                      placeholder={`${t('auth.sign_in.password')} *`}
                      onChange={(e: any) => {
                        setPassword(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.password}
                      touched={touched}
                    />

                    <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={rememberMe}
                            color="primary"
                            onChange={(e: any) => {
                              setRememberMe(e.target.checked)
                            }}
                          />
                        }
                        label={
                          <span
                            style={{ fontWeight: 600, fontSize: 14, lineHeight: 2, color: AP9_THEME.palette.grey[600] }}
                          >
                            {t('auth.sign_in.rememberMe')}
                          </span>
                        }
                      />

                      <MuiLink
                        sx={{
                          mt: 1,
                          ml: 2,
                          fontWeight: 600,
                          fontSize: 14,
                          lineHeight: 2,
                          alignItems: 'center',
                          textDecoration: 'none',
                          color: AP9_THEME.palette.primary.main,
                          cursor: 'pointer',
                        }}
                        onClick={showForgotPasswordForm}
                      >
                        {t('auth.sign_in.forgot_password')}
                      </MuiLink>
                    </Grid>
                  </Grid>

                  <AuthButton label={t('auth.sign_in.label')} />
                </BaseForm>
              )
            }}
          </Formik>
        </Box>

        <TextWithLink
          text={t('auth.sign_in.dont_have_an_account')}
          label={t('auth.sign_up.label')}
          onClick={handleShowSignUpForm}
        />
      </Container>
      {submitting && <Loader />}
    </>
  )
}
