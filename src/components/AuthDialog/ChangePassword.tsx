import React, { useEffect, useState } from 'react'
import { Box, Grid, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { changePasswordSchema } from './validateSchema'
import AuthButton from './AuthButton'
import BaseForm from '../BaseForm'
import FormInputPassword from '../FormInputPassword'
import URLs from '../../constants/URLs'
import { useApiRequest } from '../../hooks/useApiRequest'
import { useDispatch } from 'react-redux'
import { closeAuthDialog } from '../../store/slices/layoutSlice'
import Loader from '../Loader'

interface Props {
  email: string
  code: string
}

export const ChangePassword = ({ email, code }: Props) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { t } = useTranslation()
  const [changePasswordData, setChangePasswordData] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [typeInput, setTypeInput] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const {
    data: response,
    error: error,
    isValidating,
    mutate,
  } = useApiRequest(
    { url: `${URLs.AUTH_RESET_PASSWORD}`, method: 'POST', data: changePasswordData },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
    }
  )

  useEffect(() => {
    changePasswordData && mutate()
  }, [changePasswordData, mutate])

  useEffect(() => {
    if (response) {
      enqueueSnackbar(t('auth.change_password.change_password_success'), { variant: 'success' })
      dispatch(closeAuthDialog())
    } else if (error) {
      enqueueSnackbar(t('auth.change_password.change_password_failed'), { variant: 'error' })
      dispatch(closeAuthDialog())
    }
  }, [response, error, dispatch, enqueueSnackbar, t])

  const submitForm = (values: any) => {
    setChangePasswordData({ email, verifiedCode: code, newPassword: values.password })
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
            initialValues={{ password: '', confirmPassword: '' }}
            onSubmit={submitForm}
            validationSchema={changePasswordSchema(password, t)}
          >
            {(properties) => {
              const { touched, errors, handleSubmit, handleChange, handleBlur } = properties

              return (
                <BaseForm label={t('auth.change_pwd.label')} onSubmit={handleSubmit}>
                  <Grid container>
                    <Typography textAlign={'left'} pb={2}>
                      {t('auth.change_pwd.title')}
                    </Typography>

                    <FormInputPassword
                      require={true}
                      label={t('auth.sign_up.password')}
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

                    <FormInputPassword
                      require={true}
                      label={t('auth.sign_up.re_password')}
                      size={'small'}
                      value={confirmPassword}
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
                  </Grid>
                  <AuthButton label={t('auth.change_pwd.send')} />
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
