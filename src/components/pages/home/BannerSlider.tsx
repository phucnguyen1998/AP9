import { Theme, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { ICampaignItem } from '../../CampaignList'
import BannerSliderItem from './BannerSliderItem'
import { useMobileCheck } from '../../../hooks/common'

export interface BannerItem {
  image: string
  url?: string
  name?: string
  id?: number
  priority?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  sliderWrapper: {
    display: 'flex',
    width: '100%',
    height: 200,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    paddingBottom: 26,
    position: 'relative',
    marginTop: 12,

    '& .swiper-pagination': {
      lineHeight: '10px',
      bottom: 0,
    },

    [theme.breakpoints.up('lg')]: {
      height: 398,
      paddingBottom: 30,
      marginTop: 0,

      '& .swiper-pagination-bullet': {
        width: 10,
        height: 10,
      },
    },
  },
  slideImage: {
    width: '100%',
    height: 'auto',
  },
}))

const splitSliderData = (items: Array<ICampaignItem>, numberPerChunk = 1) => {
  const slidesData: Array<Array<ICampaignItem>> = []
  const data = [...items]
  while (data.length > 0) {
    const slideData: Array<ICampaignItem> = data.splice(0, numberPerChunk)
    slidesData.push(slideData)
  }

  return slidesData
}

const BannerSlider = (props: { items: Array<ICampaignItem> }) => {
  SwiperCore.use([Pagination, Autoplay])
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const { items } = props
  const classes = useStyles()
  let numberPerChunk = 6
  if (isMobile) {
    numberPerChunk = 2
    if (isSmallDevice) {
      numberPerChunk = 1
    }
  }
  let slides = splitSliderData(items, numberPerChunk)
  if (isSmallDevice) {
    slides = slides.slice(0, 12)
  }

  return (
    <Swiper
      slidesPerView={isMobile ? 1.15 : 1}
      pagination={{ clickable: true }}
      className={classes.sliderWrapper}
      centeredSlides={isMobile}
      centeredSlidesBounds={isMobile}
      spaceBetween={12}
      autoplay={{ delay: 5000 }}
      loop
    >
      {slides.map((slideItems: Array<ICampaignItem>, index: number) => {
        return (
          <SwiperSlide key={`banner-slide-${index}`}>
            <BannerSliderItem items={slideItems} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default BannerSlider
