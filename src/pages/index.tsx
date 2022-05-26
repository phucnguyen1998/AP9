import { styled as MuiStyled, Theme } from '@mui/material'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import CampaignList from '../components/CampaignList'
import { ContentContainer } from '../components/Layout/styled'
import Loader from '../components/Loader'
import HomePageHeader from '../components/pages/home/HomePageHeader'
import { HomePageCampaignListConfig, HomePageCampaignLists } from '../constants/configs'
import URLs from '../constants/URLs'
import { useApiRequest, APIRequestOptions } from '../hooks/useApiRequest'

const PageWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,
  maxWidth: '100%',
  minWidth: '100%',
  marginBottom: 36,
  alignItems: 'center',

  [style.theme.breakpoints.up('lg')]: {
    rowGap: 48,
  },
}))

const Home: NextPage = () => {
  const { t } = useTranslation()
  const campaignsReqOpt: Array<APIRequestOptions> = HomePageCampaignLists.map((cpl) => ({
    url: `${URLs.HOME_CAMPAIGNS_LIST}?type=${cpl.type}`,
    method: 'GET',
  }))

  const { data, isValidating } = useApiRequest(
    [{ url: `${URLs.HOME_CAMPAIGNS_HOT}`, method: 'GET' }, ...campaignsReqOpt],
    {
      revalidateOnMount: true,
    }
  )

  if (isValidating) {
    return (
      <ContentContainer>
        <Loader />
      </ContentContainer>
    )
  }

  const [banners, ...campaignListsData] = (data || []) as Array<any>
  const bannerItems = banners?.data || []

  return (
    <PageWrapper>
      <HomePageHeader
        banners={[
          ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
          // ...bannerItems,
        ]}
      />

      <ContentContainer>
        {HomePageCampaignLists.map((cpl: HomePageCampaignListConfig, index: number) => (
          <CampaignList items={campaignListsData?.[index]?.data} {...cpl} key={cpl.id} />
        ))}
      </ContentContainer>
    </PageWrapper>
  )
}

export default Home
