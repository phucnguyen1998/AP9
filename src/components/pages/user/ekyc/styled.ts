import { styled as MuiStyled } from '@mui/material/styles'
import { AP9_THEME } from '../../../../constants/theme'
import { Box, Typography, InputLabel, Theme } from '@mui/material'
import { UploadIcon, Passport, PersonKyc, IdBack, IdFront } from '../../../AP9Icons'

export const BoxWrapperContent = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: 24,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingTop: 24,
  },
}))

export const GridWrapper = MuiStyled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  columnGap: '24px',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

export const BoxWrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
  },
  paddingTop: 24,
  paddingBottom: 24,
}))

export const BoxContent = MuiStyled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    paddingTop: 24,
  },
}))

export const StyledWrapperUpload = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  columnGap: 8,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    columnGap: 8,
    flexDirection: 'row',
  },
}))

export const StyledTitle = MuiStyled(Typography)((style: { theme: Theme }) => ({
  display: 'inline-block',
  fontSize: '20px',
  fontWeight: 700,
  [style.theme.breakpoints.down('lg')]: {
    marginBottom: 24,
  },
}))

export const StyledUploadArea = MuiStyled('label')(({ theme }) => ({
  width: '100%',
  height: '100px',
  [theme.breakpoints.up('lg')]: {
    width: '60%',
    height: '200px',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  cursor: 'pointer',
  background: AP9_THEME.palette.grey[300],
}))

export const StyledRightBlock = MuiStyled(Box)(({ theme }) => ({
  width: '100%',
  height: '100px',
  marginBottom: 8,
  [theme.breakpoints.up('lg')]: {
    width: '40%',
    height: '200px',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  border: '1px solid #ECECEE',
}))

export const StyledUploadIcon = MuiStyled(UploadIcon)(({ theme }) => ({
  width: '42px',
  height: '31.5px',
  [theme.breakpoints.up('lg')]: {
    width: '81.7px',
    height: '61.28px',
  },
}))

export const StyledPassportIcon = MuiStyled(Passport)(({ theme }) => ({
  width: '120px',
  [theme.breakpoints.up('lg')]: {
    width: '211px',
    height: '195px',
  },
}))

export const StyledIdBack = MuiStyled(IdBack)(({ theme }) => ({
  width: '120px',
  [theme.breakpoints.up('lg')]: {
    width: '211px',
    height: '195px',
  },
}))

export const StyledIdFront = MuiStyled(IdFront)(({ theme }) => ({
  width: '120px',
  [theme.breakpoints.up('lg')]: {
    width: '211px',
    height: '195px',
  },
}))

export const StyledPersonKyc = MuiStyled(PersonKyc)(({ theme }) => ({
  width: '84px',
  [theme.breakpoints.up('lg')]: {
    width: '163.24px',
    height: '162.5px',
  },
}))

export const StyledUploadLabel = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  paddingTop: 8,
  [theme.breakpoints.up('lg')]: {
    fontSize: '16px',
    fontWeight: 600,
    paddingTop: 12,
  },
}))

export const StyledUploadTitle = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    fontSize: '16px',
    fontWeight: 700,
  },
  paddingTop: 12,
}))

export const StyledInputLabel = MuiStyled(InputLabel)(({ theme }) => ({
  marginBottom: '8px',
  [theme.breakpoints.up('lg')]: {},
  fontWeight: 600,
  fontSize: '16px',
  color: '#110F24',
}))
