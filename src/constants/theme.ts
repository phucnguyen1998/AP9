import { createTheme, Theme } from '@mui/material'

export const AP9_THEME: Theme = createTheme({
  palette: {
    background: {
      default: '#F6F6F9',
    },
    primary: {
      main: '#176BFB',
    },
    secondary: {
      main: '#F6F6F9',
    },
    warning: {
      main: '#ed6c02',
      dark: '#d32f2f',
    },
    info: {
      main: '#E67337',
    },
    text: {
      primary: '#110F24',
      secondary: '#110F2460',
    },
    grey: {
      600: '#aaaaaf',
    },
  },
  typography: {
    fontFamily: 'Nunito, san-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  spacing: 8,
})
