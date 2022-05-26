import { Divider, styled as MuiStyled, Theme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HeaderCms from '../../components/cms/HeaderCms'
import AllNewsBlock from '../../components/pages/news/AllNewsBlock'
import FlashNewsBlock from '../../components/pages/news/FlashNewBlock'
import MostReadBlock from '../../components/pages/news/MostReadBlock'
import NewestBlock from '../../components/pages/news/NewestBlock'
import TopicBlock from '../../components/pages/news/TopicBlock'
import URLs from '../../constants/URLs'
import { useCmsApiRequest } from '../../hooks/useApiRequest'

const PageWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  minWidth: '100%',
  marginBottom: 36,
  alignItems: 'center',
}))

const ContentContainer = MuiStyled('div')((style: { theme: Theme }) => ({
  padding: '0px 16px',
  rowGap: 16,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',

  [style.theme.breakpoints.between('lg', 'xl')]: {
    padding: '24px 32px',
  },
  [style.theme.breakpoints.up('xl')]: {
    padding: '24px 68px',
    rowGap: 24,
  },
}))

const StyledDivider = MuiStyled(Divider)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    color: 'rgba(17, 15, 36, 0.4);',
    borderBottomWidth: 'medium',
  },
}))

const NewsPage = () => {
  const [listCategory, setListCategory] = useState<any>([])

  const { data: listCategories, mutate } = useCmsApiRequest(
    { url: `${URLs.CMS_LIST_CATEGORY}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  useEffect(() => {
    if (listCategories) {
      let data = listCategories.data.map((item: any) => {
        return {
          name: item.name,
          title: item.name,
          post: item.post,
          categoryName: item.name,
          totalPost: item.posts.length,
          slug: item.slug,
          link: `/category/${item.slug}`,
        }
      })
      data.unshift({ title: 'Trang chủ', link: '/news' })
      setListCategory(data)
    }
  }, [listCategories])

  return (
    <PageWrapper>
      <HeaderCms listCategory={listCategory} />
      <ContentContainer>
        <FlashNewsBlock />
        <StyledDivider sx={{ paddingTop: '24px' }} />
        <NewestBlock listCategory={listCategory} />
        <StyledDivider />
        <MostReadBlock />
        <TopicBlock listCategories={listCategory} />
        <AllNewsBlock listCategory={listCategory} />
      </ContentContainer>
    </PageWrapper>
  )
}

export default NewsPage
