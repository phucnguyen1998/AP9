import { Grid, styled as MuiStyled, Theme, Link } from '@mui/material'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import CampaignHeader from '../../components/pages/campaign/CampaignHeader'
import URLs, { createAbsoluteURL } from '../../constants/URLs'
import StyledImage from '../../components/StyledImage'
import CampaignContent from '../../components/pages/campaign/CampaignContent'
import CampaignExtraInfo from '../../components/pages/campaign/CampaignExtraInfo'
import CampaignRelated from '../../components/pages/campaign/CampaignRelated'

const MainContent = MuiStyled('div')((style: { theme: Theme }) => ({
  padding: 0,

  [style.theme.breakpoints.between('lg', 'xl')]: {
    padding: '0 32px ',
  },

  [style.theme.breakpoints.up('xl')]: {
    padding: '0 60px',
  },
}))

const CampaignInfoWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 8,

  [style.theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    marginTop: 24,
    columnGap: 24,
  },
}))

const BreadCrumbs = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const { name, ...other } = props
  return (
    <div {...other}>
      <NextLink href="/campaigns" passHref>
        <Link sx={{ minWidth: 70 }}>{t('campaign_detail.breadcrumb_campaigns_page')}</Link>
      </NextLink>
      <span>/</span>
      <div className="current-page">{name}</div>
    </div>
  )
})((style: { theme: Theme }) => ({
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 600,
  display: 'flex',
  columnGap: 6,
  margin: '6px 16px',

  '& a, span': {
    textDecoration: 'none !important',
    color: style.theme.palette.text.secondary,
  },

  '& .current-page': {
    textTransform: '',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  [style.theme.breakpoints.up('lg')]: {
    fontSize: 16,
    margin: '32px 32px 24px 32px',
  },
  [style.theme.breakpoints.up('xl')]: {
    margin: '32px 68px 24px 68px',
  },
}))

const Banner = MuiStyled(StyledImage)((style: { theme: Theme }) => ({
  maxHeight: '50vw',
  overflow: 'hidden',
  '& span': { transform: 'translateY(-10%)' },

  [style.theme.breakpoints.up('lg')]: {
    maxHeight: 480,
  },
}))

const CampaignDetailPage = (props: any) => {
  const { data, campaignId } = props
  const {
    banner,
    name,
    introduction,
    action_point,
    rejected_reason,
    other_notice,
    cookie_duration,
    url,
    logo,
    attributes,
    sales_price,
  } = data || {}

  return (
    <Grid container sx={{ padding: 0 }}>
      <Grid item xs={12}>
        {/* <Banner src={banner || '/images/default-campaign-banner.png'} /> */}
        <BreadCrumbs name={name} />
        <MainContent>
          <CampaignHeader
            name={name}
            attributes={attributes}
            price={sales_price || 0}
            logo={logo || banner}
            id={campaignId}
          />
          <CampaignInfoWrapper>
            <CampaignContent
              sx={{ flexGrow: 1 }}
              data={{ introduction, action_point, rejected_reason, other_notice }}
            />
            <CampaignExtraInfo data={{ cookie_duration, url, logo }} />
          </CampaignInfoWrapper>
        </MainContent>
        <CampaignRelated campaignId={campaignId} />
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(context: any) {
  const { campaignId } = context?.params || {}

  const response = await fetch(createAbsoluteURL(URLs.CAMPAIGN_DETAIL.replace(':id', campaignId)))
  const responseData = await response.json()

  if (!responseData?.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...responseData,
      campaignId,
    },
  }
}

export default CampaignDetailPage
