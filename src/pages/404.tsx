import styled from '@emotion/styled'
import { Button, Container, styled as MuiStyled, Theme } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #fff;
  width: 100%;
  padding: 24px 0;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`

const LeftBlock = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  [style.theme.breakpoints.up('lg')]: {
    minWidth: 330,
  },
}))

const RightBlock = MuiStyled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  maxWidth: '80%',
  minWidth: '80%',
  height: '100%',
  minHeight: 200,
  position: 'relative',
  marginBottom: 24,
  maxHeight: 400,

  [theme.breakpoints.up('lg')]: {
    marginBottom: 0,
    minWidth: 0,
  },
}))

const TitleWrapper = MuiStyled('h1')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 32,
  fontWeight: 700,
  lineHeight: '40px',
  margin: 0,
  [theme.breakpoints.up('md')]: {
    fontSize: 48,
    lineHeight: '64px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 60,
    lineHeight: '80px',
  },
}))

const BackToHomeButton = MuiStyled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 16,
  lineHeight: '40px',
  fontWeight: 700,
  width: 265,
  marginTop: '36px',
  [theme.breakpoints.up('lg')]: {
    fontSize: 24,
  },
}))

const Page404 = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const redirectToHome = () => {
    router.push('/')
  }

  return (
    <Wrapper>
      <Container sx={{ display: 'flex' }}>
        <MainContent>
          <LeftBlock>
            <TitleWrapper>
              <div>Page 404</div>
              <div>Not Found</div>
            </TitleWrapper>
            <BackToHomeButton color="primary" variant="contained" onClick={redirectToHome}>
              {t('404.return_home_button')}
            </BackToHomeButton>
          </LeftBlock>
          <RightBlock>
            <Image src="/images/404-banner.svg" alt="AP9" layout="fill" />
          </RightBlock>
        </MainContent>
      </Container>
    </Wrapper>
  )
}

export default Page404
