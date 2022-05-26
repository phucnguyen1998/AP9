import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { NEWS_VARIANT } from '../../../constants/common'
import URLs from '../../../constants/URLs'
import { useCmsApiRequest } from '../../../hooks/useApiRequest'
import CustomPagination from '../../CustomPagination'
import Loader from '../../Loader'
import Advertising from '../../cms/Advertising'
import Block from '../../cms/Block'
import Categories from '../../cms/CategoryList'
import RecommentPost from '../../cms/RecommentPost'
import NewsItem from '../../cms/newsItem'
import { styled as MuiStyled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { generateImageUrl } from '../../../utils/common'

interface IAllNewsBlockProps {
  listCategory: any
}

const StyledBoxAllNews = MuiStyled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    width: 'calc(70% - 25px)',
    borderTop: '3px solid rgba(17, 15, 36, 0.4)',
  },
}))

const StyledTitle = MuiStyled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    padding: '24px 0',
    fontSize: '28px',
    lineHeight: '40px',
    fontWeight: 700,
  },
}))

const StyledTitleMobile = MuiStyled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '20px',
  paddingBottom: '24px',
  lineHeight: '24px',
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

const StyledRightBox = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    width: 'calc(30% - 25px)',
  },
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

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  paddingTop: '24px',
  // [theme.breakpoints.up('lg')]: {
  //   paddingTop: '24px',
  // },
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  columnGap: '50px',
}))

const AllNewsBlock: React.FunctionComponent<IAllNewsBlockProps> = (props) => {
  const { listCategory } = props
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [pageIndex, setPageIndex] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState<any>({})
  const [recomment, setRecomment] = useState<any>([])
  const [lang, setLang] = useState<any>('vi')

  const {
    data: allPost,
    mutate: mutateAllpost,
    isValidating,
  } = useCmsApiRequest(
    { url: `${URLs.CMS_GET_ALL_POST}?page=${pageIndex}&lang=${lang}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  // useEffect(() => {
  //   if(locale)
  //     setLang(locale)
  // }, [locale])

  useEffect(() => {
    if (allPost) {
      setPaginationInfo(allPost.meta)
      const shuffled = allPost.data.sort(() => 0.5 - Math.random())
      let selected = shuffled.slice(0, 2)
      let data = selected.map((item: any) => {
        return {
          img: item.image,
          title: item.title,
          category: item.category,
          slug: item.slug,
          date: dayjs(item.published_at).format('YYYY-MM-DD'),
          ratingStar: 5,
        }
      })
      setRecomment(data)
    }
  }, [allPost])

  const onPageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setPageIndex(newPage)
  }

  const renderAllNews = () => {
    return (
      allPost &&
      allPost.data.map((item: any, index: number) => {
        return (
          <NewsItem
            key={index}
            title={item.title}
            date={item.published_at}
            description={item.description}
            category={item.category}
            image={generateImageUrl(item.image)}
            linkPost={`/news/${item.slug}`}
            variant={NEWS_VARIANT.ALL_NEW}
          />
        )
      })
    )
  }

  return (
    <Wrapper>
      <StyledBoxAllNews>
        <StyledTitle>{t('news.all_news_title')}</StyledTitle>
        <StyledTitleMobile>{t('news.newest_title')}</StyledTitleMobile>
        <StyledListNews>
          {renderAllNews()}
          {isValidating && <Loader />}
        </StyledListNews>
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
      </StyledBoxAllNews>
      <StyledRightBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
          <Block>
            <Advertising />
          </Block>

          <Block>{listCategory && <Categories Categories={listCategory} />}</Block>

          <Block>
            <RecommentPost recommentPost={recomment} />
          </Block>
        </Box>
      </StyledRightBox>
    </Wrapper>
  )
}

export default AllNewsBlock
