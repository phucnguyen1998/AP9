import * as React from 'react'
import { TextField } from 'formik-mui'
import { styled as MuiStyled } from '@mui/material/styles'
import { InputLabel, MenuItem } from '@mui/material'
import { Field } from 'formik'

const StyledInputLabel = MuiStyled(InputLabel)(({ theme }) => ({
  marginBottom: '8px',
  fontWeight: 600,
  fontSize: '16px',
  color: '#110F24',
}))

export function FormSelect(props: any) {
  const { listOptions, name, placeholder, className, required } = props
  return (
    <>
      <div className={className}>
        <StyledInputLabel>
          {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
        </StyledInputLabel>
        <Field component={TextField} size="small" type="text" name={name} select fullWidth>
          {listOptions &&
            listOptions.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </Field>
      </div>
    </>
  )
}
