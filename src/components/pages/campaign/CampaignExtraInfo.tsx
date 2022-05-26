import { styled as MuiStyled, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMobileCheck } from '../../../hooks/common'
import StyledImage from '../../StyledImage'

const CampaignExtraInfo = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const isMobile = useMobileCheck()
  const { className, data } = props
  const { url, cookie_duration, logo, payment_duration, verify_duration } = data
  const linkIcon = isMobile ? logo : '/images/campaign-link-icon.svg'

  return (
    <div>
      <div className={className}>
        <div className="field-wrapper source-link">
          <StyledImage src={linkIcon} className="field-icon" key={isMobile ? 'mobile' : 'desktop'} />
          <div className="field-content">
            <div className="field-value">{url}</div>
            <div className="field-description">{t('campiagn_detail.official_news_source')}</div>
          </div>
        </div>
        <div className="field-wrapper">
          <StyledImage src="/images/campaign-verify-icon.svg" className="field-icon" />
          <div className="field-content">
            <div className="field-value">
              {verify_duration ? (
                <>
                  <span>{verify_duration / (24 * 3600)}</span>
                  <span>{t('campaign_detail.day')}</span>
                </>
              ) : (
                'N/A'
              )}
            </div>
            <div className="field-description">{t('campiagn_detail.verification_time')}</div>
          </div>
        </div>
        <div className="field-wrapper">
          <StyledImage src="/images/campaign-pay-icon.svg" className="field-icon" />
          <div className="field-content">
            <div className="field-value">
              {payment_duration ? (
                <>
                  <span>{payment_duration / (24 * 3600)}</span>
                  <span>{t('campaign_detail.day')}</span>
                </>
              ) : (
                'N/A'
              )}
            </div>
            <div className="field-description">{t('campiagn_detail.pay_time')}</div>
          </div>
        </div>
        <div className="field-wrapper">
          <StyledImage src="/images/campaign-cookie-icon.svg" className="field-icon" />
          <div className="field-content">
            <div className="field-value">
              <span>{cookie_duration / (24 * 3600)}</span>
              <span>{t('campaign_detail.day')}</span>
            </div>
            <div className="field-description">{t('campiagn_detail.cookie_saving_time')}</div>
          </div>
        </div>
      </div>
    </div>
  )
})((style: { theme: Theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,
  padding: 12,
  maxWidth: '100%',

  '& .field-wrapper': {
    display: 'flex',
    width: '100%',
    columnGap: 10,
    alignItems: 'center',
  },

  '& .field-content': {
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    flexGrow: 1,
    rowGap: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  '& .source-link': {
    columnGap: 12,
    marginBottom: 8,
  },

  '& .field-value': {
    display: 'flex',
    columnGap: 4,
    fontSize: 14,
    lineHeight: '16px',
    position: 'relative',
    fontWeight: 600,
  },

  '& .field-icon': {
    width: 24,
    minWidth: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },

  '& .source-link .field-icon': {
    with: 40,
    minWidth: 40,
    border: `0.5px solid ${style.theme.palette.text.secondary}`,
    borderRadius: 8,
    overflow: 'hidden',
  },

  '& .source-link .field-value': {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'block',
  },

  '& .field-description': {
    fontSize: 12,
    lineHeight: '16px',
    color: `${style.theme.palette.text.primary}60`,
  },

  [style.theme.breakpoints.up('lg')]: {
    padding: '10px 24px 24px 24px',
    minWidth: 400,
    maxWidth: 400,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,

    '& .field-wrapper': {
      display: 'flex',
      width: '100%',
      columnGap: 16,
    },

    '& .source-link': {
      columnGap: 16,
      marginBottom: 0,
    },

    '& .field-icon': {
      width: 32,
      minWidth: 32,
    },

    '& .source-link .field-icon': {
      with: 32,
      minWidth: 32,
      border: `none`,
      borderRadius: 0,
      overflow: 'hidden',
    },

    '& .field-value': {
      fontSize: 14,
      lineHeight: '16px',
      color: '#000',
      fontWeight: 600,
    },

    '& .source-link .field-value': {
      maxWidth: '100%',
      width: '100%',
    },
    '& .field-description': {
      fontSize: 14,
      lineHeight: '16px',
      color: style.theme.palette.text.secondary,
    },
  },
}))

export default CampaignExtraInfo
