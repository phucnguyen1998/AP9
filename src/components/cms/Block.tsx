import { Box } from '@mui/material'
import * as React from 'react'

interface IBlockProps {
  children: any
}

const Block: React.FunctionComponent<IBlockProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </Box>
  )
}

export default Block
