import { styled as MuiStyled, Theme } from '@mui/material'
import { CampaignTypes } from '../../../constants/configs'
import { ICampaignItem } from '../../CampaignList'
import BannerSlider, { BannerItem } from './BannerSlider'
import CampaignTypeInfo, { ICampaignTypeInfo } from './CampaignTypeInfo'

const Wrapper = MuiStyled('div')({
  width: '100%',
  position: 'relative',
})

const CampaignTypesWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '24px 16px',

  [style.theme.breakpoints.up('lg')]: {
    justifyContent: 'center',

    columnGap: 40,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 1,
  },
}))

const HomePageHeader = (props: { banners: Array<ICampaignItem> }) => {
  const { banners } = props
  return (
    <Wrapper>
      <BannerSlider items={banners} />
      {/* <CampaignTypesWrapper>
        {CampaignTypes.map((info: ICampaignTypeInfo) => (
          <CampaignTypeInfo {...info} key={info.title} />
        ))}
      </CampaignTypesWrapper> */}
    </Wrapper>
  )
}

export default HomePageHeader
