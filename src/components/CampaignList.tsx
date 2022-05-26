import { styled as MuiStyled, Theme, Typography, Link, useTheme, useMediaQuery, Grid, Button } from '@mui/material'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useCampaignLinkGeneration } from '../hooks/common'
import { openAuthDigalog } from '../store/slices/layoutSlice'
import { RootState } from '../store/store'
import { getCampaignAttribute } from '../utils/common'
import Loader from './Loader'
import StyledImage from './StyledImage'

export interface ICampaignItem {
  id: string
  source_name: string
  campaign_id: string
  name: string
  logo: string
  banner: string
  scope: 1
  category_id: number
  category_name: string
  start_time: string
  end_time: string | null
  type: number
  attributes: Object
  url: string
  cookie_duration: number
  approval_rule: null
  sales_price: number | null
  sales_ratio: number
  org_max_com: string
  payment_duration: number | null
  introduction: string
  action_point: string
  rejected_reason: string
  other_notice: string
  status: number | null
  statusText: string | null
  published_at: string | null
}

// Components for CampaignList
const ListWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: 12,
  columnGap: 8,
  justifyContent: 'flex-start',
  width: '100%',
  [style.theme.breakpoints.up('lg')]: {
    rowGap: 20,
    columnGap: 24,
  },
}))
const RowItems = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  columnGap: 8,
  width: '100%',

  [style.theme.breakpoints.up('lg')]: {
    columnGap: 24,
  },
}))
const ListTitleWrapper = MuiStyled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: 18,
})
const ListTitle = MuiStyled((props: any) => <Typography {...props} />)((style: { theme: Theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: style.theme.palette.text.primary,
  display: 'flex',
  columnGap: 8,
  alignItems: 'center',
  [style.theme.breakpoints.up('lg')]: {
    fontSize: 24,
    lineHeight: '32px',
  },
}))
const ViewAllLink = MuiStyled(Link)((style: { theme: Theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  [style.theme.breakpoints.up('lg')]: {
    fontSize: 16,
    fontWeight: 400,
  },
}))

// Components for CampaignItem
const ItemWrapper = MuiStyled(Link)((style: { theme: Theme }) => ({
  position: 'relative',
  backgroundColor: '#fff',
  borderRadius: 10,
  overflow: 'hidden',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 1.07289px 3.21866px rgba(0, 0, 0, 0.1)',
  textDecoration: 'none',

  [style.theme.breakpoints.up('sm')]: {
    maxWidth: 'calc(50% - 6.4px)',
  },

  [style.theme.breakpoints.up('lg')]: {
    flex: 1,
    maxWidth: 'calc(20% - 20px)',
  },
}))

const BannerWrapper = MuiStyled('div')({
  position: 'relative',
  overflow: 'hidden',
})

const InfoWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  rowGap: 10,
  flexGrow: 1,
}))

const CampaignTitle = MuiStyled('div')((style: { theme: Theme }) => ({
  color: style.theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  fontSize: 14,
  lineHeight: '18px',

  [style.theme.breakpoints.up('lg')]: {
    fontSize: 16,
    lineHeight: 1.5,
  },
}))

const SalePriceText = MuiStyled('div')((styled: { theme: Theme }) => ({
  color: '#E67337',
  fontSize: 14,
  lineHeight: '16px',
}))

const CategoryText = MuiStyled(SalePriceText)((styled: { theme: Theme }) => ({
  marginTop: 10,
  color: styled.theme.palette.text.secondary,
  textTransform: 'capitalize',
}))

export const CampaignItem = MuiStyled(
  (props: {
    data: ICampaignItem
    className?: string
    variant?: 'normal' | 'slider' | 'slider-reverse' | 'slider-small'
  }) => {
    const { banner, name, sales_price, category_name, id, attributes } = props.data
    const defaultBanner = '/images/default-campaign-banner.png'
    const url = `/campaign/${id}`
    const attributeName = getCampaignAttribute(attributes)
    const variantClassName = props.variant || ''
    const user = useSelector((store: RootState) => store.auth.user, shallowEqual)
    const dispatch = useDispatch()
    const campaignRedirectURL = useCampaignLinkGeneration(id)
    const { t } = useTranslation()

    const handleSeftProcessClick = () => {
      if (!user) {
        dispatch(openAuthDigalog())
        return
      }
      window.location.href = campaignRedirectURL.fullLink
    }

    return (
      <NextLink href={url} passHref>
        <ItemWrapper className={[variantClassName, props.className || ''].join(' ')}>
          <BannerWrapper className="banner-wrapper">
            <StyledImage src={banner || defaultBanner} defaultImage={defaultBanner} layout="fill" />
            {attributeName && (
              <div className="feature-item">
                <StyledImage src={`/images/campaign-${attributeName.toLowerCase()}.svg`} />
              </div>
            )}
          </BannerWrapper>
          <InfoWrapper className="campaign-info-wrapper">
            {!props.variant?.includes('slider') && (
              <>
                <CampaignTitle className="campaign-title">{name}</CampaignTitle>
                <div>
                  <SalePriceText className="campaign-price">{`${sales_price || `$0`}`}</SalePriceText>
                  <CategoryText>{category_name.toLocaleLowerCase()}</CategoryText>
                </div>
              </>
            )}
            {props.variant?.includes('slider') && (
              <>
                <div>
                  <CampaignTitle className="campaign-title">{name}</CampaignTitle>
                  <SalePriceText className="campaign-price">{`${sales_price || `$0`}`}</SalePriceText>
                </div>
                <div className="slider-button-wrapper" onClick={handleSeftProcessClick}>
                  <Button className="slider-button">{t('campaign_detail.self_process_button_label')}</Button>
                </div>
              </>
            )}
          </InfoWrapper>
        </ItemWrapper>
      </NextLink>
    )
  }
)((style: { theme: Theme }) => ({
  '& .feature-item': {
    position: 'absolute',
    width: '100%',
    top: '7%',
    left: '42%',
    transform: 'rotateZ(45deg)',
  },

  '& .banner-wrapper': {
    maxHeight: 120,
    minHeight: 120,
  },

  '&[class*="slider"], &[class*="slider"] .banner-wrapper': {
    borderRadius: 0,
    boxShadow: 'none',
    flexGrow: 1,
    maxHeight: 'none',
  },

  '&[class*="slider"] .campaign-title': {
    fontSize: 18,
    lineHeight: '24px',
    marginBottom: 8,
  },
  '&[class*="slider"] .campaign-price': {
    fontSize: 14,
    fontWeight: 600,
  },

  '&.slider-reverse': {
    flexDirection: 'column-reverse',
  },

  '&.slider-small .banner-wrapper': {
    width: '100%',
    height: '100%',
  },

  '& .slider-button-wrapper': {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },

  '& .slider-button': {
    background: 'linear-gradient(90deg, #1C56B9 0%, #176BFB 100%)',
    display: 'flex',
    width: 'auto',
    color: '#fff',
    textTransform: 'none',
    borderRadius: 50,
    padding: '10px 16px',
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 600,
    minWidth: 140,
  },

  '&.slider-reverse .campaign-info-wrapper, &.slider .campaign-info-wrapper': {
    background: 'linear-gradient(180deg, #DEF1FF 0%, #FFFFFF 100%)',
    padding: 24,
    flexGrow: 'unset',
  },

  [style.theme.breakpoints.down('lg')]: {
    '&.slider-reverse .campaign-info-wrapper, &.slider .campaign-info-wrapper': {
      display: 'none',
    },
  },
}))

export interface CampaignListProps {
  items: Array<ICampaignItem>
  id: string
  title?: string
  allItemsLink?: string
  allItemsLinkTitle?: string
  mobileIcon?: JSX.Element
  loading?: Boolean
  showAllItems?: Boolean
  itemsPerRow?: { desktop?: number; mobile?: number }
}

const getChunks = (items: Array<any>, itemPerChunk: number): Array<Array<any>> => {
  let splitingItems = [...items]
  const chunks: Array<Array<any>> = []
  while (splitingItems.length > 0) {
    chunks.push([...splitingItems.splice(0, itemPerChunk)])
  }
  return chunks
}

const CampaignList = (props: CampaignListProps) => {
  const { t } = useTranslation()
  const { id, items, title, allItemsLinkTitle, allItemsLink, mobileIcon, loading, showAllItems, itemsPerRow } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const renderItems = showAllItems ? items : items?.slice(0, isMobile ? 4 : 10) || []
  const chunkSize = isMobile ? itemsPerRow?.mobile || 2 : itemsPerRow?.desktop || 5
  const chunks = getChunks(renderItems, chunkSize)

  return (
    <Grid container>
      {title && (
        <ListTitleWrapper>
          <ListTitle component="h3">
            {isMobile && mobileIcon}
            <span>{t(title)}</span>
          </ListTitle>
          {allItemsLinkTitle && allItemsLink && (
            <NextLink href={allItemsLink} passHref>
              <ViewAllLink sx={{ textDecoration: 'none' }}>{t(allItemsLinkTitle)}</ViewAllLink>
            </NextLink>
          )}
        </ListTitleWrapper>
      )}

      <ListWrapper>
        {chunks.map((chunk: Array<ICampaignItem>, rIndex: number) => (
          <RowItems key={`campaign-row-items-${id}-${rIndex}`}>
            {chunk.map((item: ICampaignItem, index: number) => (
              <CampaignItem
                data={item}
                key={`campaign-item-${id}-${index}`}
                sx={{
                  maxWidth: `calc(${100 / chunkSize}% - ${
                    ((isMobile ? 8 : 24) * (chunkSize - 1)) / chunkSize
                  }px) !important`,
                }}
              />
            ))}
          </RowItems>
        ))}
      </ListWrapper>
      {loading && <Loader />}
    </Grid>
  )
}

export default CampaignList
