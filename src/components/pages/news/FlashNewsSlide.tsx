import { Box, Divider, Theme, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { FlashIcon } from '../../AP9Icons'
import { makeStyles } from '@mui/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper'
import 'swiper/css/bundle'
import { useTranslation } from 'react-i18next'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import Link from 'next/link'

interface IFlashNewsSlideProps {
  data: any
}

const useStyles = makeStyles((theme: Theme) => ({
  sliderWrapper: {
    // '& .swiper-pagination': {
    //   display: 'none',
    // },
  },
}))

SwiperCore.use([Pagination, Autoplay, Navigation])

const FlashNewsSlide: React.FunctionComponent<IFlashNewsSlideProps> = (props) => {
  const { data } = props
  const { t } = useTranslation()
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const classes = useStyles()
  const title =
    data &&
    data.map((item: any, index: number) => {
      return (
        <SwiperSlide key={index}>
          <Link href={`/news/${item.slug}`} passHref>
            <Typography
              sx={{
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#54555E',
                padding: '0px 0 0 24px',
              }}
            >
              {item.title}
            </Typography>
          </Link>
        </SwiperSlide>
      )
    })

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '5px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', bgcolor: '#2D95E3', borderRadius: '5px 0 0 5px' }}>
        <FlashIcon sx={{ fontSize: '16px', width: '8px', marginLeft: '16px' }} />
        <Typography
          sx={{
            fontSize: '14px',
            width: '120px',
            textTransform: 'uppercase',
            fontWeight: 700,
            lineHeight: '17.6px',
            color: '#fff',
            padding: '9px 16px',
          }}
        >
          {t('news.news_flash')}
        </Typography>
      </Box>
      <Swiper
        slidesPerView={1}
        className={classes.sliderWrapper}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!,
        }}
        loop
      >
        {title}
      </Swiper>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '30px' }}>
        <Box ref={prevRef} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%' }}>
          <ChevronLeftOutlinedIcon sx={{ color: '#54555E' }} />
        </Box>
        <Divider orientation="vertical" flexItem sx={{ margin: '2px 16px' }} />
        <Box
          ref={nextRef}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%', paddingRight: '16px' }}
        >
          <ChevronRightOutlinedIcon sx={{ color: '#54555E' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default FlashNewsSlide
