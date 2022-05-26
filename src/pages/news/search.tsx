import * as React from 'react'
import { Box, Breadcrumbs, Divider, styled as MuiStyled, Theme, Typography, Link as MuiLink } from '@mui/material'
import { useRouter } from 'next/router'
import URLs from '../../constants/URLs'
import { useCmsApiRequest } from '../../hooks/useApiRequest'
import { useEffect, useState } from 'react'
import HeaderCms from '../../components/cms/HeaderCms'
import Block from '../../components/cms/Block'
import NewsLetter from '../../components/cms/NewsLetter'
import SocialList from '../../components/cms/SocialList'
import Advertising from '../../components/cms/Advertising'
import Categories from '../../components/cms/CategoryList'
import PopularPosts from '../../components/cms/PopularPosts'
import dayjs from 'dayjs'
import RecommentPost from '../../components/cms/RecommentPost'
import { NEWS_VARIANT } from '../../constants/common'
import NewsItem from '../../components/cms/newsItem'
import CustomPagination from '../../components/CustomPagination'
import { useTranslation } from 'react-i18next'

interface ISearchProps {}

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

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  // paddingTop: '24px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  columnGap: '50px',
}))

const StyledBoxContent = MuiStyled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    width: 'calc(70% - 25px)',
  },
}))

const StyledRightBox = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    width: 'calc(30% - 25px)',
  },
}))

const StyledListNews = MuiStyled(Box)(({ theme }) => ({
  rowGap: '16px',
  [theme.breakpoints.up('lg')]: {
    rowGap: '30px',
  },
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}))

const StyledPagination = MuiStyled(Box)(({ theme }) => ({
  paddingTop: '16px',
  [theme.breakpoints.up('lg')]: {
    // margin: 'auto',
    paddingTop: '30px',
  },
  width: '100%',
  '& > .MuiPagination-root > .MuiPagination-ul': {
    justifyContent: 'center',
  },
}))

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const router = useRouter()
  const { keyword } = router.query
  const { t } = useTranslation()
  const [listCategory, setListCategory] = useState<any>([])
  const [recomment, setRecomment] = useState<any>([])
  const [paginationInfo, setPaginationInfo] = useState<any>({})
  const [pageIndex, setPageIndex] = useState(1)

  const { data: searchData, mutate: mutateSearch } = useCmsApiRequest(
    { url: `${URLs.CMS_SEARCH}?search=${keyword}&page=${pageIndex}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  const { data: listCategories, mutate } = useCmsApiRequest(
    { url: `${URLs.CMS_LIST_CATEGORY}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  const { data: dataPostMostView, mutate: mutatePostMostView } = useCmsApiRequest(
    { url: `${URLs.CMS_POST_MOST_VIEW}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  useEffect(() => {
    if (searchData) {
      setPaginationInfo(searchData.meta)
    }
  }, [searchData])

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

  useEffect(() => {
    if (dataPostMostView) {
      const shuffled = dataPostMostView.data.sort(() => 0.5 - Math.random())
      let selected = shuffled.slice(0, 2)
      let data = selected.map((item: any) => {
        return {
          img: item.image,
          title: item.title,
          category: item.category,
          date: dayjs(item.published_at).format('YYYY-MM-DD'),
          slug: item.slug,
          ratingStar: 5,
        }
      })
      setRecomment(data)
    }
  }, [dataPostMostView])

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPageIndex(newPage)
  }

  const renderNews = () => {
    return (
      searchData &&
      searchData.data.map((item: any, index: number) => {
        return (
          <NewsItem
            key={index}
            title={item.title}
            date={item.published_at}
            description={item.description}
            category={item.category}
            image={item.image}
            linkPost={`/news/${item.slug}`}
            variant={NEWS_VARIANT.ALL_NEW}
          />
        )
      })
    )
  }

  return (
    <PageWrapper>
      <HeaderCms listCategory={listCategory} />
      <ContentContainer>
        <Wrapper>
          <StyledBoxContent>
            <Typography sx={{ fontSize: '28px', fontWeight: 700, paddingBottom: '24px' }}>
              {t('news.results_search')} {`"${keyword}"`}
            </Typography>
            <StyledListNews>{renderNews()}</StyledListNews>
            <Box sx={{ width: '100%' }}>
              <StyledPagination>
                <CustomPagination
                  count={paginationInfo?.last_page}
                  page={paginationInfo?.current_page || 1}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  onChange={onPageChange}
                />
              </StyledPagination>
            </Box>
          </StyledBoxContent>

          <StyledRightBox>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
              <Block>{dataPostMostView && <PopularPosts listPopularPost={dataPostMostView.data} />}</Block>

              <Block>
                <NewsLetter variant="small" />
              </Block>

              <Block>
                <SocialList />
              </Block>

              <Block>
                <Advertising />
              </Block>

              <Block>
                <Categories Categories={listCategory} />
              </Block>

              <Block>
                <RecommentPost recommentPost={recomment} />
              </Block>
            </Box>
          </StyledRightBox>
        </Wrapper>
      </ContentContainer>
    </PageWrapper>
  )
}

export default Search
