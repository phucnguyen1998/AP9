/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { changePasswordSchema } from './validateSchema'
import AuthButton from '../../AuthDialog/AuthButton'
import BaseForm from '../../BaseForm'
import FormInputPassword from '../../FormInputPassword'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { shallowEqual, useSelector } from 'react-redux'
import { useApiRequest } from '../../../hooks/useApiRequest'
import { RootState } from '../../../store/store'
import URLs from '../../../constants/URLs'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import Loader from '../../Loader'

const ChangePasswordComponent = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [captcha, setCaptcha] = useState('')
  const accessToken = useSelector((store: RootState) => store.auth.accessToken, shallowEqual)
  const [dataForChangePassword, setDataForChangePassword] = useState<any>(null)

  // call api change password
  const { data, error, mutate, isValidating } = useApiRequest({
    url: `${URLs.AUTH_CHANGE_PASSWORD_FOR_LOGGED_IN_USER}`,
    method: 'POST',
    data: dataForChangePassword,
    accessToken,
  })

  const handleFormSubmit = (values: any, helpers: any) => {
    setDataForChangePassword({ ...values, captcha })
  }

  const { touched, errors, handleSubmit, handleChange, handleBlur, resetForm, values } = useFormik({
    initialValues: { currentPassword: '', newPassword: '' },
    onSubmit: handleFormSubmit,
    validationSchema: changePasswordSchema(t),
  })

  useEffect(() => {
    if (dataForChangePassword) {
      mutate()
    }
  }, [dataForChangePassword])

  useEffect(() => {
    if (data) {
      enqueueSnackbar(t('auth.change_pwd_for_logged_user.change_pwd_success'), { variant: 'success' })
      resetForm()
    } else if (error) {
      enqueueSnackbar(error.data.data, { variant: 'error' })
    }
  }, [data, error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        position: 'relative',
      }}
    >
      {isValidating && <Loader />}

      <BaseForm
        label={t('auth.change_pwd_for_logged_user.label')}
        onSubmit={handleSubmit}
        variantLabel={'h4'}
        styleLabel={{ fontSize: 20 }}
      >
        <Grid container>
          <FormInputPassword
            styleInput={{ fontSize: 17, fontWeight: 700, paddingBottom: 1 }}
            require={true}
            label={t('auth.change_pwd_for_logged_user.current_pwd')}
            size={'normal'}
            value={values.currentPassword}
            name={'currentPassword'}
            placeholder={`${t('auth.change_pwd_for_logged_user.current_pwd')} *`}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.currentPassword}
            touched={touched}
          />

          <FormInputPassword
            styleInput={{ fontSize: 17, fontWeight: 700, paddingBottom: 1 }}
            require={true}
            label={t('auth.change_pwd_for_logged_user.new_pwd')}
            size={'normal'}
            value={values.newPassword}
            name={'newPassword'}
            placeholder={`${t('auth.change_pwd_for_logged_user.new_pwd')} *`}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.newPassword}
            touched={touched}
          />
        </Grid>

        <GoogleReCaptcha
          onVerify={(token) => {
            setCaptcha(token)
          }}
        />

        <AuthButton disable={Object.keys(errors).length > 0} label={t('auth.change_pwd_for_logged_user.send')} />
      </BaseForm>
    </Box>
  )
}

export default ChangePasswordComponent
