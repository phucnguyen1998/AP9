import { styled as MuiStyled, Theme } from '@mui/material'
import { CampaignItem, ICampaignItem } from '../../CampaignList'

const BannerSliderItem = MuiStyled((props: any) => {
  const { items, ...other } = props
  const [first, second, ...rest] = items

  return (
    <div {...other}>
      <CampaignItem data={first} variant="slider" />
      {second && <CampaignItem data={second} variant="slider-reverse" />}
      {rest?.length > 0 && (
        <div className="other-items">
          {rest.map((campaign: ICampaignItem, index: number) => (
            <CampaignItem data={campaign} key={`slide-campaign-${campaign.id}-${index}`} variant="slider-small" />
          ))}
        </div>
      )}
    </div>
  )
})((style: { theme: Theme }) => ({
  display: 'flex',
  columnGap: 12,
  maxHeight: 170,
  minHeight: 170,
  width: '100%',
  overflow: 'hidden',

  '& > a': { borderRadius: '4px !important' },

  '& .other-items': {
    display: 'none',
    maxHeight: '100%',
  },

  [style.theme.breakpoints.up('lg')]: {
    maxHeight: '100%',
    columnGap: 8,

    '& > a': {
      maxWidth: '30%',
      width: '30%',
      minWidth: '30%',
      borderRadius: 0,
    },

    '& .other-items': {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: 8,
      rowGap: 8,
    },

    '& .other-items > a': {
      width: '50%',
      maxWidth: 'calc(50% - 8px)',
      minWidth: 'calc(50% - 8px)',
      maxHeight: 'calc(50% - 4px)',
    },

    '& .other-items .campaign-info-wrapper': {
      display: 'none',
    },
  },
}))

export default BannerSliderItem
