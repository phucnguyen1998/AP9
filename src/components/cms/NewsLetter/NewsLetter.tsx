import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { styled as MuiStyled, Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useTranslation } from 'react-i18next'

interface INewsLetterSmallProps {
  handleSignUp?: (values: any) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  styleInput: {
    '& > .MuiOutlinedInput-root': { borderTopRightRadius: '0', borderBottomRightRadius: '0' },
  },
  styleButton: {
    borderTopLeftRadius: '0!important',
    borderBottomLeftRadius: '0!important',
    background: '#2D95E3',
    boxShadow: 'none!important',
    fontSize: '14px!important',
    fontWeight: '700!important',
    '&:hover': { background: '#2D95E3!important' },
  },
}))

const StyledTitleComponent = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '32px',
  paddingBottom: '24px',
}))

const NewsLetterSmall: React.FunctionComponent<INewsLetterSmallProps> = (props) => {
  const { handleSignUp } = props
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const { t } = useTranslation()

  const handleChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleClick = () => {
    if (typeof handleSignUp === 'function') {
      handleSignUp(email)
    }
  }

  return (
    <Box sx={{ padding: '24px 24px 32px 24px' }}>
      <StyledTitleComponent>{t('cms.news_letter_component_title')}</StyledTitleComponent>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <EmailOutlinedIcon sx={{ width: '18px', height: '18px', marginRight: 1, marginTop: '2px', color: '#AFB2BD' }} />
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#83858F' }}>
          {t('cms.news_letter_subcrible_title')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '16px' }}>
        <TextField
          placeholder={t('cms.news_letter_your_email_placeholder')}
          size="small"
          value={email}
          onChange={handleChange}
          className={classes.styleInput}
        />
        <Button variant="contained" size="medium" className={classes.styleButton} onClick={handleClick}>
          {t('cms.news_letter_button_sign_up')}
        </Button>
      </Box>
    </Box>
  )
}

export default NewsLetterSmall
