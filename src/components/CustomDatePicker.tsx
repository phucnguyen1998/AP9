import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import enUS from 'date-fns/locale/en-US'
import vi from 'date-fns/locale/vi'
import { styled as MuiStyled, TextField, Theme, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'

console.log('vi', vi)

const localeMap: any = {
  en: enUS,
  vi,
}

const maskMap: any = {
  vi: '__/__/____',
  en: '__/__/____',
}

const useStyles = makeStyles({
  root: {
    '& .PrivatePickersToolbar-root': {
      display: 'none',
    },
  },
})

const CustomDatePicker = MuiStyled((props: any) => {
  const { locale } = useRouter()
  const currentLocale = locale || 'vi'
  const classes = useStyles()
  const theme = useTheme()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[currentLocale]}>
      <DatePicker
        views={['day']}
        renderInput={(params) => {
          let textProps = {
            fullWidth: true,
            ...params,
            inputProps: { ...params.inputProps, placeholder: props.placeholder },
          }
          if (currentLocale === 'vi' && !props.placeholder) {
            textProps.inputProps = { ...textProps.inputProps, placeholder: 'dd/mm/yyyy' }
          }
          return <TextField {...textProps} className={props.className} />
        }}
        {...props}
        className={[props.className, 'ap9-datepicker'].join(' ')}
        mask={maskMap[currentLocale]}
        DialogProps={{
          classes: {
            root: classes.root,
          },
        }}
        desktopModeMediaQuery={theme.breakpoints.up('lg')}
      />
    </LocalizationProvider>
  )
})((style: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: style.theme.palette.background.default,
  },

  '& .MuiInputBase-root:hover fieldset': {
    borderColor: style.theme.palette.text.secondary,
  },

  '& input': {
    padding: '8px 0 8px 12px',
  },

  '& label:not(.MuiInputLabel-shrink)': {
    transform: 'translate(12px, 10px) scale(1)',
  },
  '& fieldset': {
    border: '1px solid #ECECEE',
  },
}))

export default CustomDatePicker
