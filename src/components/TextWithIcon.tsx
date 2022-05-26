import { Grid, Typography } from '@mui/material'
import * as React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface ITextWithIconProps {
  text: string
  color: any
}

const TextWithIcon: React.FunctionComponent<ITextWithIconProps> = ({ text, color }) => {
  return (
    <Grid container justifyContent="left" pb={2}>
      <CheckCircleIcon sx={{ width: '20px', height: '20px', marginRight: 1, color: color }} />
      <Typography sx={{ fontSize: 16, fontWeight: 400 }}>{text}</Typography>
    </Grid>
  )
}

export default TextWithIcon
