import * as React from 'react'
import { Autocomplete } from 'formik-mui'
import { styled as MuiStyled } from '@mui/material/styles'
import { AutocompleteRenderInputParams, InputLabel, TextField } from '@mui/material'
import { Field } from 'formik'

const StyledInputLabel = MuiStyled(InputLabel)(({ theme }) => ({
  marginBottom: '8px',
  fontWeight: 600,
  fontSize: '16px',
  color: '#110F24',
}))

export function FormAutocomplete(props: any) {
  const { options, name, touched, errors, placeholder, className, required } = props

  return (
    <>
      <div className={className}>
        <StyledInputLabel>
          {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
        </StyledInputLabel>
        <Field
          name={name}
          size="small"
          fullWidth
          component={Autocomplete}
          options={options}
          getOptionLabel={(option: any) => option.name || ''}
          isOptionEqualToValue={(option: any, value: any) => {
            if (value) return option.id === value.id
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              name={name}
              error={touched[name] && !!errors[name]}
              helperText={touched[name] && errors[name]}
              placeholder={placeholder}
            />
          )}
        />
      </div>
    </>
  )
}
