import { Grid, Link as MuiLink } from '@mui/material'
import * as React from 'react'
import { AP9_THEME } from '../../constants/theme'

interface ITextWithLinkProps {
  text: string
  label: string
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => any
}

const TextWithLink: React.FunctionComponent<ITextWithLinkProps> = ({ text, label, onClick }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item sx={{ fontWeight: 600, fontSize: 14, mt: 3 }}>
        {text} &nbsp;
        <MuiLink
          variant="body2"
          onClick={onClick}
          sx={{ textDecoration: 'none', color: AP9_THEME.palette.primary.main, cursor: 'pointer' }}
        >
          {label}
        </MuiLink>
      </Grid>
    </Grid>
  )
}

export default TextWithLink
