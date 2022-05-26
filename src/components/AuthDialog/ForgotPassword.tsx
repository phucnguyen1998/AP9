import React, { useEffect, useState } from 'react'
import { Box, Grid, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { forgotPasswordSchema } from './validateSchema'
import FormInput from './FormInput'
import AuthButton from './AuthButton'
import BaseForm from '../BaseForm'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import Loader from '../Loader'
import { useApiRequest } from '../../hooks/useApiRequest'
import URLs from '../../constants/URLs'

export const ForgotPassword = (props: { onSuccess: (email: string) => void }) => {
  const [email, setEmail] = useState('')
  const [captcha, setCaptcha] = useState('')
  const { t } = useTranslation()
  const [forgotPasswordData, setForgotPasswordData] = useState<any>(null)
  const { enqueueSnackbar } = useSnackbar()
  const { onSuccess } = props

  const {
    data: forgotResponse,
    error: forgotError,
    isValidating,
    mutate,
  } = useApiRequest(
    { url: `${URLs.AUTH_FORGET_PASSWORD}`, method: 'POST', data: forgotPasswordData },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
    }
  )

  useEffect(() => {
    forgotPasswordData && mutate()
  }, [forgotPasswordData, mutate])

  useEffect(() => {
    if (forgotResponse) {
      onSuccess(email)
      enqueueSnackbar(t('auth.forgot_pwd.request_success'), { variant: 'success' })
    } else if (forgotError) {
      enqueueSnackbar(t('auth.forgot_pwd.request_failed'), { variant: 'error' })
    }
  }, [forgotResponse, forgotError, email, t, enqueueSnackbar, onSuccess])

  const submitForm = (values: any) => {
    setForgotPasswordData({ email: values.email, captcha })
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
            initialValues={{ emailOrPhoneNumber: '' }}
            onSubmit={submitForm}
            validationSchema={forgotPasswordSchema(t)}
          >
            {(properties: any) => {
              const { touched, errors, handleSubmit, handleChange, handleBlur } = properties

              return (
                <BaseForm label={t('auth.forgot_pwd.label')} onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Typography textAlign={'left'} pb={2}>
                    {t('auth.forgot_pwd.title')}
                  </Typography>

                  <Grid container>
                    <FormInput
                      require={true}
                      label={t('auth.sign_in.email_or_phone')}
                      size={'small'}
                      value={email}
                      name={'email'}
                      placeholder={`${t('auth.sign_in.email_or_phone')} *`}
                      onChange={(e: any) => {
                        setEmail(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      errors={errors?.email}
                      touched={touched}
                    />
                  </Grid>
                  <GoogleReCaptcha
                    onVerify={(token) => {
                      setCaptcha(token)
                    }}
                  />

                  <AuthButton label={t('auth.forgot_pwd.send')} />
                </BaseForm>
              )
            }}
          </Formik>
        </Box>
      </Container>
      {isValidating && <Loader />}
    </>
  )
}
