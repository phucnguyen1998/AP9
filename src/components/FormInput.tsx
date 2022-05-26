import * as React from 'react'
import { fieldToTextField } from 'formik-mui'
import { styled as MuiStyled } from '@mui/material/styles'
import { InputLabel, TextField } from '@mui/material'

const StyledInputLabel = MuiStyled(InputLabel)(({ theme }) => ({
  marginBottom: '8px',
  [theme.breakpoints.up('lg')]: {},
  fontWeight: 600,
  fontSize: '16px',
  color: '#110F24',
}))

export function FormInput(props: any) {
  const {
    form: { setFieldValue },
    field: { name },
    required,
  } = props
  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target
      setFieldValue(name, value)
    },
    [setFieldValue, name]
  )
  const { className, placeholder } = fieldToTextField(props)
  return (
    <>
      <div className={className}>
        <StyledInputLabel>
          {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
        </StyledInputLabel>
        <TextField {...fieldToTextField(props)} onChange={onChange} />
      </div>
    </>
  )
}
