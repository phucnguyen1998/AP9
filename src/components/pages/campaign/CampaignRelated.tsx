import { styled as MuiStyled, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import URLs from '../../../constants/URLs'
import { useApiRequest } from '../../../hooks/useApiRequest'
import CampaignList from '../../CampaignList'
import { ContentContainer } from '../../Layout/styled'

const CampaignRelated = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const { campaignId, ...other } = props

  const { data, error, isValidating } = useApiRequest(
    {
      url: URLs.CAMPAIGN_RELATED.replace(':id', campaignId),
      method: 'GET',
    },
    { revalidateOnMount: true }
  )

  if (error) {
    return null
  }

  return (
    <div {...other}>
      <ContentContainer>
        <CampaignList
          id="related-campaigns"
          title={t('campaign_detail.related_campaigns')}
          items={data?.data || []}
          loading={isValidating}
          showAllItems
        />
      </ContentContainer>
    </div>
  )
})((style: { theme: Theme }) => ({
  marginTop: 16,
  marginBottom: 90,

  [style.theme.breakpoints.up('lg')]: {
    marginTop: 24,
    marginBottom: 24,
  },
}))

export default CampaignRelated
