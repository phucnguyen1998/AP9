import { Grid, Typography, TextField, styled as MuiStyled, Theme } from '@mui/material'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface IFormInputProps {
  label: any
  value: any
  placeholder: any
  onChange?: any
  onBlur?: any
  errors?: any
  touched?: any
  name?: any
  size: any
  require: boolean
  disable?: boolean
  mb?: number
  handleFocus?: any
}

const Error = MuiStyled((props: any) => <Typography component={'div'} {...props} />)(({ theme }) => ({
  fontSize: 12,
  color: theme?.palette?.warning?.dark,
  marginTop: 8,
}))

export const StyledTextField = MuiStyled(TextField)((style: { theme: Theme }) => ({
  paddingBottom: 0,
  [style.theme.breakpoints.up('lg')]: {},
  '& .MuiInputBase-root': {
    backgroundColor: style.theme.palette.secondary.main,
  },
  '& fieldset': {
    border: '1px solid #ECECEE',
  },
  '& .MuiInputBase-root:hover fieldset': {
    borderColor: style.theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-input:disabled': {
    backgroundColor: '#ECECEE',
  },
}))

const FormInput: React.FunctionComponent<IFormInputProps> = ({
  require,
  label,
  value,
  placeholder,
  name,
  size,
  onChange,
  onBlur,
  errors,
  touched,
  disable = false,
  mb = 3,
  handleFocus,
}) => {
  const { t } = useTranslation()
  return (
    <Grid item xs={12} mb={mb}>
      <Typography textAlign={'left'} variant="body1" sx={{ marginBottom: 1, fontSize: 16, fontWeight: 600 }}>
        {label} {require && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <StyledTextField
        disabled={disable}
        placeholder={placeholder}
        fullWidth
        size={size}
        name={name}
        type="text"
        onBlur={onBlur}
        onFocus={handleFocus}
        value={value}
        onChange={onChange}
        InputLabelProps={{ shrink: false }}
      />
      {errors && touched?.[name] && <Error>{t(errors)}</Error>}
    </Grid>
  )
}

export default FormInput
