import { Box, Typography } from '@mui/material'
import * as React from 'react'

interface IBaseFormProps {
  label?: string
  onSubmit: () => any
  children: any
  variantLabel?: any
  styleLabel?: any
  sx?: any
}

const BaseForm: React.FunctionComponent<IBaseFormProps> = ({ label, onSubmit, children, sx }) => {
  return (
    <Box component="form" noValidate sx={{ ...sx }} onSubmit={onSubmit}>
      {label && (
        <Typography
          fontWeight={'bold'}
          textAlign={'left'}
          component="h1"
          variant="h5"
          sx={{ fontSize: 28, marginBottom: 2 }}
        >
          {label}
        </Typography>
      )}

      {children}
    </Box>
  )
}

export default BaseForm
