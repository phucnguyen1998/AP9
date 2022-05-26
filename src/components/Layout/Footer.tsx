import { Typography, styled as MuiStyled, Link as MuiLink, Grid } from '@mui/material'
import Logo from '../Logo'
import { FooterMenu, FooterPolicyMenu } from '../../constants/configs'
import Navigation from '../Navigation'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import { Container, ContentContainer } from './styled'

const FooterWrapper = MuiStyled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  width: '100%',
  marginTop: 1,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    justifyContent: 'center',

    '& >div': {
      padding: '24px 64px',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& >div': {
      padding: '24px 127px',
    },
  },
}))

const DownloadAppTitle = MuiStyled((props: any) => <Typography component="div" {...props} color={'textPrimary'} />)({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.5,
})

const AppLinks = MuiStyled('div')({
  display: 'flex',
  columnGap: 12,
})

const Footer1Wrapper = MuiStyled('div')({
  display: 'flex',
  flexGrow: 1,
})

const Footer1Left = MuiStyled('div')({
  display: 'flex',
  flexGrow: 1,
  rowGap: '18px',
  flexDirection: 'column',
})

const Footer1Right = MuiStyled('div')({
  display: 'flex',
  rowGap: '8px',
  flexDirection: 'column',
  marginLeft: 24,
  justifyContent: 'center',
})

const Footer2Wrapper = MuiStyled('div')({
  display: 'flex',
  borderTop: '1px solid #ececee',
  justifyContent: 'space-between',
  paddingTop: 28,
  marginTop: 20,
})

const CopyRight = MuiStyled((props: any) => <Typography component={'div'} {...props} />)({
  color: 'rgba(17, 15, 36, 0.4)',
  fontSize: 12,
  lineHeight: '24px',
})

const AppLink = MuiStyled(MuiLink)({})

const Footer = () => {
  const { t } = useTranslation()
  return (
    <FooterWrapper>
      <Container sx={{ flexDirection: 'column' }}>
        <Footer1Wrapper>
          <Footer1Left>
            <Logo size="large" />
            <Navigation items={FooterMenu} showActiveLink={false} variant="footer" />
          </Footer1Left>
          <Footer1Right>
            <DownloadAppTitle>{t('footer.download_app_title')}</DownloadAppTitle>
            <AppLinks>
              <Link href={'#/'} passHref>
                <MuiLink>
                  <Image src="/images/appstore.png" alt="AP9 iOS App" width={100} height={40} />
                </MuiLink>
              </Link>
              <Link href={'#/'} passHref>
                <MuiLink>
                  <Image src="/images/chplay.png" alt="AP9 Android App" width={100} height={40} />
                </MuiLink>
              </Link>
            </AppLinks>
          </Footer1Right>
        </Footer1Wrapper>
        <Footer2Wrapper>
          <Navigation items={FooterPolicyMenu} showActiveLink={false} variant="policy" />
          <CopyRight>Design with love © AP9 2022. All right reserved</CopyRight>
        </Footer2Wrapper>
      </Container>
    </FooterWrapper>
  )
}

export default Footer
