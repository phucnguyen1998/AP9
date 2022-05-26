import { Button } from '@mui/material'
import * as React from 'react'

interface IButtonSocialProps {
  children?: any
  text: string
  bgColor: string
  onClick: any
}

const ButtonSocial: React.FunctionComponent<IButtonSocialProps> = ({ children, text, bgColor, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: '148px',
        height: '46px',
        background: bgColor,
        color: '#fff',
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '17.6px',
        padding: '14px 28px 14px 28px',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'row',
        columnGap: '8px',
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor: bgColor,
        },
      }}
      onClick={onClick}
    >
      {children}
      {text}
    </Button>
  )
}

export default ButtonSocial
