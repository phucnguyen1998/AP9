import { Button } from '@mui/material'
import * as React from 'react'

interface IAuthButtonProps {
  label: string
  disable?: boolean
  size?: any
  mt?: number
}

const AuthButton: React.FunctionComponent<IAuthButtonProps> = ({ label, disable = false, size, mt = 3 }) => {
  return (
    <Button
      size={size}
      disabled={disable}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: mt, py: 1, fontWeight: 700, fontSize: 18, textTransform: 'initial' }}
    >
      {label}
    </Button>
  )
}

export default AuthButton
