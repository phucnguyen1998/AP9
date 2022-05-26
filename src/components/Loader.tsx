import { CircularProgress, styled as MuiStyled, Theme } from '@mui/material'

const Loader = MuiStyled((props: any) => (
  <div {...props}>
    <CircularProgress color="primary" />
  </div>
))((style: { theme: Theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,

  '&.fixed': {
    position: 'fixed',
    top: 65,
    left: 0,
    bottom: 0,
    right: 0,
  },
  [style.theme.breakpoints.up('lg')]: {
    '&.fixed': {
      bottom: 227,
      height: 'auto',
    },
  },
}))

export default Loader
