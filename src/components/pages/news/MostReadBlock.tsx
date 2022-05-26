import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useRef } from 'react'
import { NEWS_VARIANT } from '../../../constants/common'
import { Swiper, SwiperSlide } from 'swiper/react'
import URLs from '../../../constants/URLs'
import { useCmsApiRequest } from '../../../hooks/useApiRequest'
import NewsItem from '../../cms/newsItem'
import { styled as MuiStyled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { generateImageUrl } from '../../../utils/common'
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'

interface IMostReadBlockProps {}

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    paddingBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
  },
}))

const useStyles = makeStyles((theme) => ({
  sliderWrapper: {
    '& > .swiper-wrapper > .swiper-slide': {
      height: '250px',
    },
  },
}))

SwiperCore.use([Pagination, Autoplay, Navigation])

const MostReadBlock: React.FunctionComponent<IMostReadBlockProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const { data, mutate } = useCmsApiRequest(
    { url: `${URLs.CMS_POST_MOST_VIEW}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  const newsSlide =
    data &&
    data.data.slice(0, 10).map((item: any, index: number) => {
      return (
        <SwiperSlide key={index}>
          <NewsItem
            title={item.title}
            date={item.date}
            description={item.description}
            category={item.category}
            image={generateImageUrl(item.image)}
            linkPost={`/news/${item.slug}`}
            variant={NEWS_VARIANT.MOST_READ}
          />
        </SwiperSlide>
      )
    })

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 700 }}>{t('news.most_read_title')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '5px', height: '30px' }}>
          <Box
            ref={prevRef}
            sx={{
              cursor: 'pointer',
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              borderRadius: '5px',
            }}
          >
            <ChevronLeftOutlinedIcon sx={{ color: '#54555E' }} />
          </Box>
          <Box
            ref={nextRef}
            sx={{
              cursor: 'pointer',
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              borderRadius: '5px',
            }}
          >
            <ChevronRightOutlinedIcon sx={{ color: '#54555E' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          className={classes.sliderWrapper}
          lazy={false}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          loop
        >
          {newsSlide}
        </Swiper>
      </Box>
    </Wrapper>
  )
}

export default MostReadBlock
