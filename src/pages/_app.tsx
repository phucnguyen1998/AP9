import type { AppProps } from 'next/app'
import { Theme, ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Provider } from 'react-redux'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { PersistGate } from 'redux-persist/integration/react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { vi, enUS } from 'date-fns/locale'

import { store, persistor } from '../store/store'
import { AP9_THEME } from '../constants/theme'
import viTranslation from '../languages/vi.json'
import enTranslation from '../languages/en.json'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { useMobileCheck } from '../hooks/common'

i18next.use(initReactI18next).init({
  resources: {
    vi: {
      translation: viTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  lng: 'vi',
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .SnackbarContent-root': {
      minWidth: '0 !important',
    },
  },
}))

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter()
  const classes = useStyles()
  const isMobile = useMobileCheck()
  const [languageDatePicker, setLanguageDatePicker] = useState<any>(null)

  useEffect(() => {
    i18next.changeLanguage(locale)
    if (locale === 'vi') {
      setLanguageDatePicker(vi)
    } else {
      setLanguageDatePicker(enUS)
    }
  }, [locale])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY}>
          <ThemeProvider theme={AP9_THEME}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              autoHideDuration={2000}
              classes={{ containerRoot: classes.root }}
              dense={isMobile}
            >
              <LocalizationProvider locale={languageDatePicker} dateAdapter={AdapterDateFns}>
                <Layout>
                  <Head>
                    <title>AP9 - Best Advertising System</title>
                  </Head>
                  <Component {...pageProps} />
                </Layout>
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
