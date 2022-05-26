/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { styled as MuiStyled } from '@mui/material/styles'
import { Box, Typography, Grid, Button } from '@mui/material'
import { RightHandIcon, CCCD, PassportIcon } from '../../AP9Icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

interface KycStepOneProps {
  handleClick: any
}

const BoxWrapperContent = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: 24,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingTop: 24,
  },
}))

const BoxWrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 24,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
  },
}))

const BoxContent = MuiStyled(Box)(({ theme }) => ({
  paddingTop: 8,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 24,
    paddingTop: 8,
  },
}))

const StyledTypography = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  [theme.breakpoints.up('lg')]: {
    fontSize: '18px',
    fontWeight: 400,
  },
}))

const StyledTitle = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    fontSize: '18px',
    fontWeight: 700,
  },
}))

const GridWrapper = MuiStyled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '24px',
  paddingTop: 24,
  [theme.breakpoints.up('lg')]: {
    paddingTop: 48,
    display: 'flex',
    flexDirection: 'row',
  },
}))

const StyledButton = MuiStyled(Box)(({ theme }) => ({
  width: '122px',
  height: '122px',
  [theme.breakpoints.up('lg')]: {
    width: '188px',
    height: '188px',
  },
  borderRadius: '8px',
  cursor: 'pointer',
  border: '1px solid #F6F6F9',
}))

const StyledButtonLabel = MuiStyled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 700,
  },
}))

const WrapperAuthButton = MuiStyled(Grid)(({ theme }) => ({
  paddingTop: '24px',
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingTop: 0,
    width: '50%',
  },
}))

const KycStepOne: React.FunctionComponent<KycStepOneProps> = ({ handleClick }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const accessToken = useSelector((store: any) => store.auth.accessToken, shallowEqual)
  let content = [t('kyc_page.reason_1'), t('kyc_page.reason_2'), t('kyc_page.reason_3')]
  useEffect(() => {
    if (!accessToken) {
      router.push('/')
    }
  }, [accessToken])
  return (
    <>
      <BoxWrapperContent sx={{ borderBottom: '1px solid #CCCED0' }}>
        <StyledTitle textAlign={'left'} variant="h1">
          {t('kyc_page.title_step_1')}
        </StyledTitle>
        <BoxContent>
          {content.map((item, index) => {
            return (
              <Grid key={index} justifyContent="left" sx={{ display: 'flex', paddingTop: 2 }}>
                <RightHandIcon sx={{ width: '20px', height: '23px', marginRight: 1 }} />
                <StyledTypography>{item}</StyledTypography>
              </Grid>
            )
          })}
        </BoxContent>
      </BoxWrapperContent>
      <BoxWrapper>
        <StyledTitle textAlign={'center'} variant="h1">
          {t('kyc_page.choose_identity_document')}
        </StyledTitle>

        <GridWrapper>
          <StyledButton>
            <CCCD />
            <StyledButtonLabel>{t('kyc_page.identity_card_label')}</StyledButtonLabel>
          </StyledButton>
          <StyledButton>
            <PassportIcon />
            <StyledButtonLabel>{t('kyc_page.passport_label')}</StyledButtonLabel>
          </StyledButton>
        </GridWrapper>
        <WrapperAuthButton>
          <Button
            size="small"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1, fontWeight: 700, fontSize: 18, textTransform: 'initial' }}
            onClick={handleClick}
          >
            {t('kyc_page.button_label')}
          </Button>
        </WrapperAuthButton>
      </BoxWrapper>
    </>
  )
}

export default KycStepOne
