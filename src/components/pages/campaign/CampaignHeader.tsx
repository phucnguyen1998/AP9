import { styled as MuiStyled, Theme, Typography, Link as MuiLink, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { useCampaignLinkGeneration, useLoggedInCheck, useMobileCheck } from '../../../hooks/common'
import StyledImage from '../../StyledImage'
import { useDispatch } from 'react-redux'
import { openAuthDigalog } from '../../../store/slices/layoutSlice'
import ShareLinkDialog from './ShareLinkDialog'
import { useState } from 'react'

const InfoWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  columnGap: 8,
  padding: 12,
  alignItems: 'center',
  rowGap: 4,

  [style.theme.breakpoints.up('lg')]: {
    columnGap: 12,
    padding: '12px 0',
  },
}))

const PriceIconWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  width: 24,
  height: '100%',
  minWidth: 24,
  minHeight: 24,
  borderRadius: 12,
  overflow: 'hidden',

  [style.theme.breakpoints.up('lg')]: {
    width: 48,
    minWidth: 48,
    minHeight: 48,
  },
}))

const PriceInfoWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  rowGap: 6,

  [style.theme.breakpoints.up('lg')]: {
    rowGap: 4,
  },
  [style.theme.breakpoints.between('lg', 1300)]: {
    maxWidth: 'calc(100% - 60px)',
  },
}))

const PriceText = MuiStyled(Typography)((style: { theme: Theme }) => ({
  color: style.theme.palette.info.main,
  fontSize: 14,
  lineHeight: '16px',
  fontWeight: 600,

  [style.theme.breakpoints.up('lg')]: {
    fontSize: 16,
    lineHeight: 1.5,
  },
}))

const PriceDescriptionText = MuiStyled(Typography)((style: { theme: Theme }) => ({
  color: `${style.theme.palette.text.primary}60`,
  fontSize: 12,
  lineHeight: '14px',

  [style.theme.breakpoints.up('lg')]: {
    fontSize: 16,
    lineHeight: 1.5,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

const FieldInfoWrapper = MuiStyled('div')({
  display: 'flex',
  alignItems: 'center',
  columnGap: 8,
})

const FieldInfoLabel = MuiStyled(Typography)((style: { theme: Theme }) => ({
  color: '#000',
  fontSize: 14,
  lineHeight: '16px',
}))

const FieldInfoValue = MuiStyled(FieldInfoLabel)({
  fontWeight: 600,
})

const CampaignTypeLink = MuiStyled(MuiLink)((style: { theme: Theme }) => ({
  textDecoration: 'none',
}))

const CampaignTypeSeparator = MuiStyled((props: any) => (
  <Typography {...props} component="span">
    {'>'}
  </Typography>
))((style: { theme: Theme }) => ({
  color: style.theme.palette.primary.main,
  margin: '0 8px',
}))

const CampaignTitle = MuiStyled(({ attributeType, title, ...other }: any) => (
  <div className="campaign-title-root" {...other}>
    <h1 className="campaign-title">{title}</h1>
    {attributeType && (
      <div className="attribute-image">
        <StyledImage src={`/images/${attributeType.toLowerCase()}-attribute.svg`} />
      </div>
    )}
  </div>
))((style: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '#fff',
  flexDirection: 'column',
  height: '100%',
  marginLeft: 16,

  '& h1': {
    margin: 0,
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 700,
  },

  '& .attribute-image': {
    marginTop: 16,
    height: 24,
    width: 'auto',
  },
  '& .attribute-image img': {
    minHeight: '24px !important',
  },

  [style.theme.breakpoints.up('lg')]: {
    flexDirection: 'column-reverse',
    flexGrow: 1,
    rowGap: 30,
    alignItems: 'flex-start',
    padding: 0,
    height: 'auto',

    '& h1': {
      fontSize: 32,
      lineHeight: 1.5,
    },

    '& .attribute-image': {
      height: 48,
      marginTop: 0,
    },
  },

  [style.theme.breakpoints.between('lg', 1300)]: {
    rowGap: 20,
    '& .attribute-image': {
      height: 40,
      width: 'auto',
    },
  },
}))

const CampaignPriceInfo = (props: { price: number }) => {
  const { t } = useTranslation()

  return (
    <InfoWrapper>
      <PriceIconWrapper>
        <StyledImage src="/images/Money.png" alt="AP9" />
      </PriceIconWrapper>
      <PriceInfoWrapper>
        <PriceText>{props.price || '$0'}</PriceText>
        <PriceDescriptionText>{t('campaign_detail.campiagn_price_description')}</PriceDescriptionText>
      </PriceInfoWrapper>
    </InfoWrapper>
  )
}

const CampaignActions = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const { className, onShareClick, onSelfProcessClick } = props

  return (
    <div className={className}>
      <Button className="share-link-button" onClick={onShareClick}>
        {t('campaign_detail.share_link_button_label')}
      </Button>
      <Button className="seft-process-button" variant="contained" color="primary" onClick={onSelfProcessClick}>
        {t('campaign_detail.self_process_button_label')}
      </Button>
    </div>
  )
})((style: { theme: Theme }) => ({
  display: 'flex',
  columnGap: 16,
  justifyContent: 'center',
  backgroundColor: '#fff',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px 16px 30px 16px',
  zIndex: 999,
  borderTop: '1px solid #f6f6f9',

  '& button': {
    textTransform: 'none',
    borderRaidus: 4,
    boxShadow: 'none !important',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1.5,
    width: 155,
  },

  '& .share-link-button': {
    backgroundColor: style.theme.palette.secondary.main,
    color: `${style.theme.palette.text.primary} !important`,
    border: `1px solid #ECECEE`,
  },

  [style.theme.breakpoints.up('lg')]: {
    position: 'relative',
    justifyContent: 'flex-start',
    marginTop: 32,
    padding: 0,
    borderTop: 'none',

    '& button': {
      height: 56,
      fontSize: 18,
      lineHeight: '24px',
    },

    '& .share-link-button': {
      padding: '16px 18px',
    },
  },
  [style.theme.breakpoints.between('lg', 1300)]: {
    marginTop: 24,
    '& button': {
      height: 48,
    },
  },
}))

const CampaignTypeAndNationality = (props: { types: Array<{ title: string; link: string }>; national?: string }) => {
  const { t } = useTranslation()
  const { types, national } = props

  return (
    <InfoWrapper sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <FieldInfoWrapper>
        <FieldInfoLabel>{t('campaign_detail.campaign_nationality_label')}:</FieldInfoLabel>
        <FieldInfoValue>{national || 'Việt Nam'}</FieldInfoValue>
      </FieldInfoWrapper>
      <FieldInfoWrapper>
        <FieldInfoLabel>{t('campaign_detail.campaign_type_label')}:</FieldInfoLabel>
        <FieldInfoValue>
          {types.map((type, index) => (
            <span key={`campaign-type-sp-${index}`}>
              <NextLink href={type.link} passHref>
                <CampaignTypeLink>{type.title}</CampaignTypeLink>
              </NextLink>
              {index < types.length - 1 && <CampaignTypeSeparator />}
            </span>
          ))}
        </FieldInfoValue>
      </FieldInfoWrapper>
    </InfoWrapper>
  )
}

const LeftBlock = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: '16px 12px',
  background: '#fff',

  [style.theme.breakpoints.up('lg')]: {
    padding: 0,
  },
}))

const CampaignHeader = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const isLoggedIn = useLoggedInCheck()
  const dispatch = useDispatch()
  const [showedShareLinkDialog, setShowedShareLinkDialog] = useState(false)
  const { logo, attributes, type, className, name, price, id } = props
  const campaignRedirectURL = useCampaignLinkGeneration(id)
  const campaignTypes = [{ title: t(`campaign_detail.type_${type || 2}_title`), link: '#/' }]
  const attributesValue = Object.values(attributes).map((attr: any) => attr?.toLowerCase())
  let attributeType
  if (attributesValue.includes('hot')) {
    attributeType = 'hot'
    campaignTypes.push({ title: 'Hot', link: '#/' })
  }

  const handleShareLinkClick = () => {
    if (!isLoggedIn) {
      dispatch(openAuthDigalog())
      return
    }

    setShowedShareLinkDialog(true)
  }

  const handleSeftProcessClick = () => {
    if (!isLoggedIn) {
      dispatch(openAuthDigalog())
      return
    }

    window.location.href = campaignRedirectURL.fullLink
  }

  const handleCloseShareLinkDialog = () => {
    setShowedShareLinkDialog(false)
  }

  return (
    <>
      <div className={className}>
        <LeftBlock>
          <StyledImage src={logo || '/images/default-brand-logo.svg'} className="brand-logo" />
          <div className="campaign-main-info">
            <CampaignTitle title={name} attributeType={attributeType} />
            <CampaignActions onShareClick={handleShareLinkClick} onSelfProcessClick={handleSeftProcessClick} />
          </div>
        </LeftBlock>
        <div className="campaign-extra-info">
          <CampaignTypeAndNationality types={campaignTypes} />
          <CampaignPriceInfo price={price} />
        </div>
      </div>
      <ShareLinkDialog
        open={showedShareLinkDialog}
        data={{ logo: logo || '/images/default-brand-logo.svg', name }}
        onClose={handleCloseShareLinkDialog}
        campaignRedirectURL={campaignRedirectURL}
      />
    </>
  )
})((style: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,

  '& .brand-logo': {
    width: 64,
    minWidth: 64,
    maxWidth: 64,
    height: 64,
    minHeight: 64,
    maxHeight: 64,
    borderRadius: 4,
    overflow: 'hidden',
  },

  '& .campaign-main-info': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 24,
  },

  '& .campaign-extra-info': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },

  [style.theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    width: '100%',
    padding: '32px 32px 24px 32px',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,

    '& .brand-logo': {
      display: 'block',
      width: 216,
      height: 216,
      minWidth: 216,
      maxHeight: 216,
      minHeight: 216,
      borderRadius: 26,
      overflow: 'hidden',
      marginRight: 32,
    },

    '& .campiagn-main-info': {
      flexGrow: 1,
      height: '100%',
      minWidth: 320,
      marginRight: 32,
    },

    '& .campaign-extra-info': {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  [style.theme.breakpoints.between('lg', 1300)]: {
    padding: '32px 32px 24px 32px',
    '& .campaign-extra-info': {
      maxWidth: 320,
    },

    '& .campiagn-main-info': {
      marginRight: 24,
    },

    '& .brand-logo': {
      display: 'block',
      width: 180,
      height: 180,
      minWidth: 180,
      minHeight: 180,
      maxHeight: 180,
      borderRadius: 20,
      overflow: 'hidden',
      marginRight: 24,
    },
  },
}))

export default CampaignHeader
