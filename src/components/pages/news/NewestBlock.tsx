import { Box, Tab, Tabs, Typography, styled as MuiStyled, Theme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NEWS_VARIANT } from '../../../constants/common'
import URLs from '../../../constants/URLs'
import { useCmsApiRequest } from '../../../hooks/useApiRequest'
import { generateImageUrl } from '../../../utils/common'
import Loader from '../../Loader'
import NewsItem from '../../cms/newsItem'

interface INewestBlockProps {
  listCategory: any
}

const StyledTabs = MuiStyled(Tabs)((style: { theme: Theme }) => ({
  '& > .MuiTabs-scroller > .MuiTabs-flexContainer > .MuiButtonBase-root ': {
    padding: '12px 0 0 24px',
    minHeight: 0,
  },
  '& > .MuiTabs-scroller > .MuiTabs-indicator ': {
    backgroundColor: 'inherit',
  },
}))

const StyledTab = MuiStyled(Tab)((style: { theme: Theme }) => ({
  fontSize: '16px',
  fontWeight: '700',
  color: '#110F24',
  textTransform: 'initial',
}))

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
  },
}))

const NewestBlock: React.FunctionComponent<INewestBlockProps> = (props) => {
  const { listCategory } = props
  const [selectedTab, setSelectedTab] = useState('tat-ca')
  const [listNews, setListNews] = useState<any>([])
  const { t } = useTranslation()

  const {
    data: listPostByCategory,
    mutate: GetPostByCategory,
    isValidating: isValidatingCategory,
  } = useCmsApiRequest({ url: `${URLs.CMS_GET_POST_BY_CATEGORY}/${selectedTab}`, method: 'GET' })

  const {
    data: allPost,
    mutate: mutateAllpost,
    isValidating: isValidatingAllPost,
  } = useCmsApiRequest({ url: URLs.CMS_GET_ALL_POST, method: 'GET' }, { revalidateOnMount: true })

  useEffect(() => {
    if (selectedTab === 'tat-ca') {
      mutateAllpost()
    } else {
      if (selectedTab) GetPostByCategory()
    }
  }, [selectedTab])

  useEffect(() => {
    if (listPostByCategory) {
      setListNews(listPostByCategory.data)
    }
  }, [listPostByCategory, selectedTab])

  useEffect(() => {
    if (allPost && selectedTab === 'tat-ca') setListNews(allPost.data)
  }, [allPost, selectedTab])

  const handleTabChange = (event: any, value: string) => {
    setSelectedTab(value)
  }

  const renderNewest = () => {
    return listNews.slice(0, 6).map((item: any, index: number) => {
      return (
        <Box key={index} sx={{ width: '31%' }}>
          <NewsItem
            title={item.title}
            date={item.published_at}
            description={item.description}
            category={item.category}
            image={generateImageUrl(item.image)}
            linkPost={`/news/${item.slug}`}
            variant={NEWS_VARIANT.NEWEST}
          />
        </Box>
      )
    })
  }

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 700 }}>{t('news.newest_title')}</Typography>
        <StyledTabs value={selectedTab ? selectedTab : 'tat-ca'} onChange={handleTabChange}>
          <StyledTab disableRipple label={t('news.tab_all')} value={'tat-ca'} />
          {listCategory &&
            listCategory.map((item: any, index: number) => {
              if (item.link !== '/news')
                return <StyledTab disableRipple key={index} label={item?.title} value={item?.link} />
            })}
        </StyledTabs>
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          columnGap: '32px',
          rowGap: '32px',
        }}
      >
        {renderNewest()}
        {(isValidatingCategory || isValidatingAllPost) && <Loader />}
      </Box>
      <Box sx={{ width: '100%', paddingTop: '24px' }}>
        <Box sx={{ width: '720px', height: '90px', margin: 'auto', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, padding: '32px' }}>Advertising</Typography>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default NewestBlock
