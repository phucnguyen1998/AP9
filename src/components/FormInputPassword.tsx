import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Grid, IconButton, styled as MuiStyled, InputAdornment, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as React from 'react'
import { StyledTextField } from './AuthDialog/FormInput'

interface IFormInputPasswordProps {
  label: any
  value: any
  placeholder: any
  onChange: any
  onBlur: any
  errors: any
  touched: any
  name: any
  size: any
  require: boolean
  styleInput?: any
}

const Error = MuiStyled((props: any) => <Typography component={'div'} {...props} />)(({ theme }) => ({
  fontSize: 12,
  color: theme?.palette?.warning?.dark,
  marginTop: 8,
}))

const FormInputPassword: React.FunctionComponent<IFormInputPasswordProps> = ({
  label,
  value,
  placeholder,
  name,
  size,
  onChange,
  onBlur,
  errors,
  touched,
  styleInput = { fontSize: 16, fontWeight: 600, marginBottom: '8px' },
}) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Grid item xs={12} mb={3}>
      <Typography textAlign={'left'} variant="body1" sx={{ ...styleInput }}>
        {label} <span style={{ color: 'red' }}>*</span>
      </Typography>
      <StyledTextField
        placeholder={placeholder}
        fullWidth
        size={size}
        name={name}
        type={showPassword ? 'text' : 'password'}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        InputLabelProps={{ shrink: false }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {errors && touched?.[name] && <Error>{t(errors)}</Error>}
    </Grid>
  )
}

export default FormInputPassword
