import { ArrowForwardIos } from '@mui/icons-material'
import { styled as MuiStyled, Theme, useMediaQuery, useTheme, Link as MuiLink } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const MobileWrapper = MuiStyled('a')({
  display: 'flex',
  alignItems: 'center',
  rowGap: 8,
  flexDirection: 'column',
  textDecoration: 'none',
})

const MobileTitle = MuiStyled('h4')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '16px',
  color: '#000',
  margin: 0,
}))

const Wrapper = MuiStyled('div')(({ theme }) => ({
  width: 300,
  height: 200,
  boxSizing: 'border-box',
  zIndex: 999,
  padding: '24px 16px 16px 24px',
  border: ` 1px solid ${theme.palette.secondary.main}`,
  backgroundColor: '#fff',
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
}))

const Title = MuiStyled('h4')(({ theme }) => ({
  fontSize: 20,
  lineHeight: 1.2,
  fontWeight: 700,
  margin: 0,
}))

const ContentWrapper = MuiStyled('div')({
  display: 'flex',
  width: '100%',
  columnGap: 8,
  marginTop: 12,
  flexGrow: 1,
})

const LeftBlock = MuiStyled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const DescriptionText = MuiStyled('div')(({ theme: Theme }) => ({
  fontSize: 16,
  lineHeight: 1.5,
  color: '#130F49',
}))

const IconWrapper = MuiStyled('div')({
  width: 96,
  minWidth: 96,
  display: 'flex',
  alignItems: 'flex-end',
})

export interface ICampaignTypeInfo {
  title: string
  description: string
  icon: string
  link: string
  linkTitle: string
}

const CampaignTypeInfo = (props: ICampaignTypeInfo) => {
  const theme: Theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { t } = useTranslation()

  const { icon, title, link, description, linkTitle } = props

  if (isMobile) {
    return (
      <Link href={link} passHref>
        <MobileWrapper title={t(description)}>
          <Image src={icon} width={32} height={32} alt={title} />
          <MobileTitle>{t(title)}</MobileTitle>
        </MobileWrapper>
      </Link>
    )
  }

  return (
    <Wrapper>
      <Title>{t(title)}</Title>
      <ContentWrapper>
        <LeftBlock>
          <DescriptionText>{t(description)}</DescriptionText>
          <Link href={link} passHref>
            <MuiLink
              sx={{
                textDecoration: 'none',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                columnGap: '8px',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              <span>{t(linkTitle)}</span>
              <ArrowForwardIos sx={{ fontSize: '16px' }} />
            </MuiLink>
          </Link>
        </LeftBlock>
        <IconWrapper>
          <Image src={icon} width={96} height={96} alt={title} />
        </IconWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default CampaignTypeInfo
