import React, { useEffect, useRef } from 'react'
import { Input } from '@mui/material'
import MuiPhoneNumber, { CountryInfo } from 'material-ui-phone-number'

const CustomMuiPhoneNumber = (props: any) => {
  const { onChange, onBlur, field, value } = props
  const inputRef = useRef(null)
  const { name } = field

  const [phoneValidationValue, setPhoneValidationValue] = React.useState(value)

  useEffect(() => {
    if (inputRef?.current) {
      const inputNode: any = inputRef?.current

      const setValue = Object.getOwnPropertyDescriptor(inputNode?.__proto__, 'value')?.set
      const event = new Event('input', { bubbles: true })
      setValue?.call(inputNode, phoneValidationValue)
      inputNode.dispatchEvent(event)
    }
  }, [inputRef, phoneValidationValue])

  const handlePhoneChange = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    country?: CountryInfo
  ) => {
    setPhoneValidationValue(`${value}|${country?.dialCode}`)
  }

  return (
    <>
      <MuiPhoneNumber
        variant="outlined"
        defaultCountry={'vn'}
        onChange={handlePhoneChange}
        fullWidth
        onBlur={onBlur}
        size="small"
        value={value.split('|')[0]}
      />
      <Input sx={{ display: 'none' }} inputRef={inputRef} onChange={onChange} name={name} />
    </>
  )
}

export default CustomMuiPhoneNumber
