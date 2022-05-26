/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Grid, Container, styled as MuiStyled, Typography, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import AuthButton from './AuthButton'
import BaseForm from '../BaseForm'
import TextWithLink from './TextWithLink'
import ReactCodeInput from 'react-verification-code-input'
import CountDown from './../CountDown'
import { useApiRequest } from '../../hooks/useApiRequest'
import URLs from '../../constants/URLs'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Loader from '../Loader'

interface Props {
  onSuccess: (code: string) => void
  email: string
}

const useStyles = makeStyles((theme: Theme) => ({
  verifyCode: {
    width: '100% !important',
    '& .styles_react-code-input__CRulA': {
      display: 'flex!important',
      justifyContent: 'space-between',
    },

    '& .styles_react-code-input__CRulA > input': {
      fontSize: 32,
      fontWeight: 900,
      width: '15% !important',
      height: '64px !important',
      borderRadius: '4px !important',
      border: '1px solid #CCCED0 !important',
    },
  },
}))

const Error = MuiStyled((props: any) => <Typography component={'div'} {...props} />)(({ theme }) => ({
  fontSize: 12,
  color: theme?.palette?.warning?.dark,
  marginTop: 8,
}))

export const VerificationCode = ({ onSuccess, email }: Props) => {
  const classes = useStyles()
  const [code, setCode] = useState('')
  const [messageError, setMessageError] = useState('')
  const [expiredTime, setExpiredTime] = useState(false)
  const [codeTime, setCodeTime] = useState(Date.now())
  const [refreshData, setRefreshData] = useState<any>(null)
  const [verifyData, setVerifyData] = useState<any>(null)
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const { executeRecaptcha } = useGoogleReCaptcha()

  // Call API to resend the change password code
  const {
    data: rfCodeResp,
    error: rfCodeError,
    isValidating: refreshingCode,
    mutate: mutateRefreshCode,
  } = useApiRequest(
    { url: `${URLs.AUTH_FORGET_PASSWORD}`, method: 'POST', data: refreshData },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
    }
  )

  useEffect(() => {
    refreshData && mutateRefreshCode()
  }, [refreshData, mutateRefreshCode])

  useEffect(() => {
    if (rfCodeResp) {
      setCodeTime(Date.now())
      enqueueSnackbar(t('auth.verify_code.resend_code_success'), { variant: 'success' })
      setExpiredTime(false)
    } else if (rfCodeError) {
      enqueueSnackbar(t('auth.verify_code.resend_code_failed'), { variant: 'error' })
    }
  }, [rfCodeResp, rfCodeError, enqueueSnackbar, t])

  const handleRequestNewCode = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (expiredTime) {
      const captcha = executeRecaptcha ? await executeRecaptcha() : ''
      setRefreshData({ email, captcha })
    }
  }

  // Call API to check the code
  const {
    data: verifyResp,
    error: verifyError,
    isValidating: verifyingCode,
    mutate: mutateVerifyCode,
  } = useApiRequest(
    { url: `${URLs.AUTH_VERIFY_FORGET_PASSWORD_CODE}`, method: 'POST', data: verifyData },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
      discardCache: true,
    }
  )

  useEffect(() => {
    verifyData && mutateVerifyCode()
  }, [verifyData, mutateVerifyCode])

  useEffect(() => {
    if (verifyResp) {
      onSuccess(verifyResp.verifiedCode)
    } else if (verifyError) {
      enqueueSnackbar(t('auth.verify_code.verify_code_failed'), { variant: 'error' })
    }
  }, [verifyResp, verifyError, enqueueSnackbar, t, onSuccess])

  const handleCountDownExpire = () => {
    setExpiredTime(true)
  }

  const handleSubmit = (code: any) => {
    if (code === '' || code.split('').length < 6) {
      setMessageError(t('auth.verify_code.invalid_code'))
      return
    } else {
      setMessageError('')
      setVerifyData({ code, email })
    }
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
            initialValues={{}}
            onSubmit={() => {
              handleSubmit(code)
            }}
            validationSchema={null}
          >
            {(properties) => {
              const { handleSubmit, handleChange } = properties

              return (
                <BaseForm label={t('auth.verify_code.label')} onSubmit={handleSubmit}>
                  <Grid container>
                    <Typography textAlign={'left'} pb={2}>
                      {t('auth.verify_code.title')}
                    </Typography>

                    <ReactCodeInput
                      className={classes.verifyCode}
                      autoFocus={true}
                      fields={6}
                      onChange={(e: any) => {
                        handleChange(e)
                        setCode(e)
                      }}
                      placeholder={['-', '-', '-', '-', '-', '-']}
                    />

                    {messageError && <Error>{messageError}</Error>}
                  </Grid>

                  <Grid container justifyContent="center">
                    <Grid item sx={{ fontWeight: 600, fontSize: 14, mt: 3 }}>
                      {t('auth.verify_code.expries_in')} &nbsp;
                      <CountDown minutes={2} seconds={0} onExpire={handleCountDownExpire} refreshTime={codeTime} />
                    </Grid>
                  </Grid>

                  <TextWithLink
                    text={t('auth.verify_code.dont_receive_code')}
                    label={t('auth.verify_code.resend_code')}
                    onClick={handleRequestNewCode}
                  />
                  <AuthButton
                    label={t('auth.verify_code.send')}
                    disable={expiredTime || code?.split('').length !== 6}
                  />
                </BaseForm>
              )
            }}
          </Formik>
        </Box>
      </Container>
      {(refreshingCode || verifyingCode) && <Loader />}
    </>
  )
}
