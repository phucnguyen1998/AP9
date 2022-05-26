import React, { useEffect, useState } from 'react'
import { Box, Grid, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { signUpSchema } from './validateSchema'
import FormInput from './FormInput'
import AuthButton from './AuthButton'
import TextWithLink from './TextWithLink'
import BaseForm from '../BaseForm'
import FormInputPassword from '../FormInputPassword'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useApiRequest } from '../../hooks/useApiRequest'
import URLs from '../../constants/URLs'
import { AuthState, signinSuccess } from '../../store/slices/authSlice'
import { closeAuthDialog } from '../../store/slices/layoutSlice'
import { RootState } from '../../store/store'
import Loader from '../Loader'

interface Props {
  handleShowSignInForm: (event: React.MouseEvent<HTMLAnchorElement>) => any
}

export const SignUpForm = ({ handleShowSignInForm }: Props) => {
  const [name, setFullname] = useState('')
  const [email, setEmailOrPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [referal_code, setReferrel] = useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const { user } = authStore

  const [showPassword, setShowPassword] = useState(false)
  const [typeInput, setTypeInput] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const [signupData, setSignupData] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  // signup processing
  const {
    data: signupResponse,
    error: signupError,
    isValidating,
    mutate,
  } = useApiRequest(
    { url: `${URLs.AUTH_SIGNUP}`, method: 'POST', data: signupData },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
    }
  )

  useEffect(() => {
    signupData && mutate()
  }, [signupData, mutate])

  useEffect(() => {
    if (signupResponse) {
      dispatch(signinSuccess(signupResponse))
    } else if (signupError) {
      setSubmitting(false)
      let errorMessage = signupError.data
      enqueueSnackbar(errorMessage.message, { variant: 'error' })
    }
  }, [signupResponse, signupError, enqueueSnackbar, dispatch])

  useEffect(() => {
    if (user) {
      enqueueSnackbar(t('auth.sign_up.sign_up_success'), { variant: 'success' })
      dispatch(closeAuthDialog())
    }
  }, [user, enqueueSnackbar, dispatch, t])
  // end signup form processing

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
    setTypeInput(!typeInput)
  }

  const onSubmit = (values: any) => {
    values.captcha = captcha
    setSubmitting(true)
    setSignupData(values)
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
            initialValues={{ name: '', email: '', password: '', confirmPassword: '', referal_code: '' }}
            onSubmit={onSubmit}
            validationSchema={signUpSchema(password, t)}
          >
            {(properties: any) => {
              const { touched, errors, handleSubmit, handleChange, handleBlur, values } = properties

              return (
                <BaseForm label={t('auth.sign_up.label')} onSubmit={handleSubmit}>
                  <Grid container>
                    <FormInput
                      require={true}
                      label={t('auth.sign_up.full_name')}
                      size={'small'}
                      value={values.name}
                      name={'name'}
                      placeholder={`${t('auth.sign_up.full_name')} *`}
                      onChange={(e: any) => {
                        setFullname(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.name}
                      touched={touched}
                    />

                    <FormInput
                      require={true}
                      label={t('auth.sign_in.email_or_phone')}
                      size={'small'}
                      value={values.email}
                      name={'email'}
                      placeholder={`${t('auth.sign_in.email_or_phone')} *`}
                      onChange={(e: any) => {
                        setEmailOrPhoneNumber(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.email}
                      touched={touched}
                    />

                    <FormInputPassword
                      require={true}
                      label={t('auth.sign_up.password')}
                      size={'small'}
                      value={values.password}
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

                    <FormInputPassword
                      require={true}
                      label={t('auth.sign_up.re_password')}
                      size={'small'}
                      value={values.confirmPassword}
                      name={'confirmPassword'}
                      placeholder={`${t('auth.sign_up.re_password')} *`}
                      onChange={(e: any) => {
                        setConfirmPassword(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.confirmPassword}
                      touched={touched}
                    />

                    <FormInput
                      require={false}
                      label={t('auth.sign_up.referral')}
                      size={'small'}
                      value={values.referal_code}
                      name={'referal_code'}
                      placeholder={`${t('auth.sign_up.referral')}`}
                      onChange={(e: any) => {
                        setReferrel(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.referal_code}
                      touched={touched}
                    />
                  </Grid>
                  <GoogleReCaptcha
                    onVerify={(token) => {
                      setCaptcha(token)
                    }}
                  />

                  <AuthButton label={t('auth.sign_up.label')} />

                  <TextWithLink
                    text={t('auth.sign_up.already_have_an_account')}
                    label={t('auth.sign_in.label')}
                    onClick={handleShowSignInForm}
                  />
                </BaseForm>
              )
            }}
          </Formik>
        </Box>
      </Container>
      {submitting && <Loader />}
    </>
  )
}
