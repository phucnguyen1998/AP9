import { styled as MuiStyled, Theme } from '@mui/material'

export const Container = MuiStyled('div')((style: { theme: Theme }) => ({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  maxWidth: '100%',
  [style.theme.breakpoints.up('lg')]: {
    backgroundColor: 'transparent',
    maxWidth: 1440,
  },
}))

export const ContentContainer = MuiStyled('div')((style: { theme: Theme }) => ({
  padding: '0 16px',
  rowGap: 16,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',

  [style.theme.breakpoints.between('lg', 'xl')]: {
    padding: '0 32px',
  },
  [style.theme.breakpoints.up('xl')]: {
    padding: '0 68px',
    rowGap: 48,
  },
}))
