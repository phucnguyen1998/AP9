/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Typography, Container, Grid } from '@mui/material'
import { styled as MuiStyled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { CCCD } from '../../AP9Icons'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface Props {}

const BoxWrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    columnGap: '32px',
  },
}))

const StyledTitleMobile = MuiStyled(Typography)(({ theme }) => ({
  paddingTop: 24,
  fontSize: '20px',
  fontWeight: 400,
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

const StyledTitleDesktop = MuiStyled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    textAlign: 'left',
    paddingBottom: 24,
    fontSize: '20px',
    fontWeight: 400,
  },
}))

const StyledButtonLabel = MuiStyled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '13px',
  fontWeight: 700,
}))

const StyledTypography = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
}))

const StyledGridContent = MuiStyled(Grid)(({ theme }) => ({
  paddingTop: 12,
  paddingBottom: 0,
  [theme.breakpoints.up('lg')]: {
    paddingTop: 0,
    paddingBottom: 12,
  },
}))

export const Guide = ({}: Props) => {
  const { t } = useTranslation()
  let content = [
    'kyc_page.view_guide.guide_1',
    'kyc_page.view_guide.guide_2',
    'kyc_page.view_guide.guide_3',
    'kyc_page.view_guide.guide_4',
    'kyc_page.view_guide.guide_5',
  ]
  return (
    <>
      <Container
        component="main"
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <Box>
          <StyledTitleDesktop textAlign={'center'} variant="h1">
            {t('kyc_page.view_guide.title')}
          </StyledTitleDesktop>
          <BoxWrapper>
            <Box sx={{ border: '1px solid #F6F6F9', background: '#F6F6F9', borderRadius: '8px' }}>
              <CCCD />
              <StyledButtonLabel>{t('kyc_page.view_guide.id')}</StyledButtonLabel>
            </Box>

            <StyledTitleMobile textAlign={'center'} variant="h1">
              {t('kyc_page.view_guide.title')}
            </StyledTitleMobile>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'left' }}>
              {content.map((item, index) => {
                return (
                  <StyledGridContent key={index} sx={{ display: 'flex' }}>
                    <CheckCircleIcon sx={{ width: '24px', height: '24px', marginRight: '12px', color: '#3CA455' }} />
                    <StyledTypography>{t(item)}</StyledTypography>
                  </StyledGridContent>
                )
              })}
            </Box>
          </BoxWrapper>
        </Box>
      </Container>
    </>
  )
}
