import { Button, Link as MuiLink } from '@mui/material'
import * as React from 'react'

interface IButtonCategoryProps {
  categoryName: string
  bgColor?: string
  position?: any
}

const ButtonCategory: React.FunctionComponent<IButtonCategoryProps> = ({
  categoryName,
  bgColor,
  position = 'absolute',
}) => {
  return (
    <MuiLink sx={{ position: position, bottom: '16px', left: '16px', textDecoration: 'none' }}>
      <Button
        size={'small'}
        variant="contained"
        sx={{ fontSize: '10px', fontWeight: 700, lineHeight: '17.6px', padding: '7px 11px 5px 11px', bgcolor: bgColor }}
      >
        {categoryName}
      </Button>
    </MuiLink>
  )
}

export default ButtonCategory
