import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { styled as MuiStyled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import Image from 'next/image'
import StyledImage from '../../StyledImage'
import 'swiper/css'
import Link from 'next/link'
import ImageSlide from '../../cms/ImageSlide'

interface IRelatedArticlesProps {
  listNews: any
}

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  // display: 'none',
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

const RelatedArticles: React.FunctionComponent<IRelatedArticlesProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { listNews } = props
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const newsSlide = listNews.map((item: any, index: any) => {
    return (
      <SwiperSlide key={index}>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '24px', height: '100%', width: '100%' }}>
          <Link href={`news/${item.slug}`} passHref>
            <ImageSlide
              src={item.image}
              defaultImage={'/images/post-1.jpeg'}
              alt={item.title}
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                cursor: 'pointer',
                '& > span': { borderRadius: '5px' },
              }}
            />
          </Link>
          <Box>
            <Link href={`news/${item.slug}`} passHref>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{item.title}</Typography>
            </Link>
          </Box>
        </Box>
      </SwiperSlide>
    )
  })

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 700 }}>{t('news.related_articles_title')}</Typography>
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
          slidesPerView={3}
          spaceBetween={24}
          className={classes.sliderWrapper}
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

export default RelatedArticles
