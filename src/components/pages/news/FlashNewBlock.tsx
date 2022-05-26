import { Box } from '@mui/material'
import * as React from 'react'
import { styled as MuiStyled, Theme } from '@mui/material'
import { useEffect, useState } from 'react'
import { NEWS_VARIANT } from '../../../constants/common'
import URLs from '../../../constants/URLs'
import { useCmsApiRequest } from '../../../hooks/useApiRequest'
import FlashNewsSlide from './FlashNewsSlide'
import NewsItem from '../../cms/newsItem'
import { generateImageUrl } from '../../../utils/common'

interface IFlashNewsBlockProps {}

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
  },
}))

const FlashNewsBlock: React.FunctionComponent<IFlashNewsBlockProps> = (props) => {
  const [listNews, setListNews] = useState([])
  const { data, mutate } = useCmsApiRequest({ url: URLs.CMS_NEW_POST_HOT, method: 'GET' }, { revalidateOnMount: true })

  useEffect(() => {
    if (data) {
      setListNews(data.data)
    }
  }, [data])

  const renderNews = (type: any, positionImage: any, index: any) => {
    if (listNews.length > 0) {
      let listNewsSlice = listNews.slice(0, 5)
      let news = listNewsSlice.filter((x: any, i: number) => {
        if (i === index) return x
      })

      const { title, category, published_at, description, slug, image } = news[0]

      return (
        <NewsItem
          positionImage={positionImage}
          title={title}
          date={published_at}
          description={description}
          category={category}
          image={generateImageUrl(image)}
          linkPost={`/news/${slug}`}
          variant={type}
        />
      )
    }
  }

  return (
    <Wrapper>
      <FlashNewsSlide data={listNews} />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', columnGap: '8px' }}>
          {renderNews(NEWS_VARIANT.FLASH_NEW, 2, 0)}
          {renderNews(NEWS_VARIANT.FLASH_NEW, 2, 1)}
        </Box>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', columnGap: '8px' }}>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
            {renderNews(NEWS_VARIANT.FLASH_NEW, 2, 2)}
            {renderNews(NEWS_VARIANT.FLASH_NEW, 1, 3)}
          </Box>
          <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
            {renderNews(NEWS_VARIANT.FLASH_NEW_LARGE, 2, 4)}
          </Box>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default FlashNewsBlock
