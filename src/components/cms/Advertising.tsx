import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'

interface IAdvertisingProps {
  title?: string
  img?: string
  content?: string
  buttonLabel?: string
  handleClick?: () => void
}

const Advertising: React.FunctionComponent<IAdvertisingProps> = (props) => {
  const {
    title = 'Centre',
    img = 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    content = 'most advanced magazine and news',
    buttonLabel = 'Buy now',
    handleClick,
  } = props
  return (
    <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ fontSize: 32, fontWeight: 700, lineHeight: '48px' }}>{title}</Typography>
      <Typography sx={{ fontSize: 18, fontWeight: 400, lineHeight: '24px', paddingTop: '16px' }}>{content}</Typography>
      <Box sx={{ paddingTop: '72px' }}>
        <Button
          size={'large'}
          variant="contained"
          sx={{ fontSize: '14px', fontWeight: 700, lineHeight: '17.6px', padding: '14px 26px' }}
          onClick={handleClick}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  )
}

export default Advertising
