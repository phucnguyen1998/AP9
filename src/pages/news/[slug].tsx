import { Box, Breadcrumbs, Divider, styled as MuiStyled, Theme, Typography, Link as MuiLink } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Advertising from '../../components/cms/Advertising'
import Block from '../../components/cms/Block'
import Categories from '../../components/cms/CategoryList'
import HeaderCms from '../../components/cms/HeaderCms'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import NewsLetter from '../../components/cms/NewsLetter'
import PopularPosts from '../../components/cms/PopularPosts'
import SocialList from '../../components/cms/SocialList'
import URLs, { createAbsoluteURLCms } from '../../constants/URLs'
import { useCmsApiRequest } from '../../hooks/useApiRequest'
import { CommentIcon } from '../../components/AP9Icons'
import Comment from '../../components/pages/newsDetail/Comment'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import RelatedArticles from '../../components/pages/newsDetail/RelatedArticles'
import FormComment from '../../components/pages/newsDetail/FormComment'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import RecommentPost from '../../components/cms/RecommentPost'

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
  background: '#fff',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
}))

const StyledRightBox = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    width: 'calc(30% - 25px)',
  },
}))

const WrapperContent = MuiStyled(Box)(({ theme }) => ({
  padding: '16px',
  [theme.breakpoints.up('lg')]: {
    padding: '32px',
  },
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '4px',
}))

const StyledTitle = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '48px',
  },
}))

const StyledCategory = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '26px',
  color: '#2D95E3',
  cursor: 'pointer',
}))

const StyledDateOfPost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '26px',
}))

const NewsDetailPage = (props: any) => {
  const { data } = props
  let newsDetail = data[0]

  const [recomment, setRecomment] = useState<any>([])

  const [listCategory, setListCategory] = useState<any>([])

  const { data: listCategories, mutate } = useCmsApiRequest(
    { url: `${URLs.CMS_LIST_CATEGORY}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  const { data: dataPostMostView, mutate: mutatePostMostView } = useCmsApiRequest(
    { url: `${URLs.CMS_POST_MOST_VIEW}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  const { data: listPostByCategory, mutate: GetPostByCategory } = useCmsApiRequest(
    { url: `${URLs.CMS_GET_POST_BY_CATEGORY}/${newsDetail.categorySlug}`, method: 'GET' },
    { revalidateOnMount: true }
  )

  console.log(listPostByCategory)

  useEffect(() => {
    if (dataPostMostView) {
      const shuffled = dataPostMostView.data.sort(() => 0.5 - Math.random())
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
  }, [dataPostMostView])

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

  const breadcrumbs = [
    <Link href={'/news'} key="1" passHref>
      <MuiLink underline="hover" key="1" color="inherit" href="/">
        Trang chủ
      </MuiLink>
    </Link>,
    <Link href={`/category/${newsDetail.category}`} key="1" passHref>
      <MuiLink underline="hover" key="1" color="inherit" href="/">
        {newsDetail.category}
      </MuiLink>
    </Link>,
    <Typography key="3" color="text.primary">
      {newsDetail.slug}
    </Typography>,
  ]

  return (
    <PageWrapper>
      <HeaderCms listCategory={listCategory} />

      <ContentContainer>
        <Box sx={{ width: '100%' }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
        <Wrapper>
          <StyledBoxContent>
            <WrapperContent>
              <StyledTitle>{newsDetail.title}</StyledTitle>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Link href="#" passHref>
                    <StyledCategory>{newsDetail.category}&nbsp;</StyledCategory>
                  </Link>
                  <StyledDateOfPost>-&nbsp;{dayjs(newsDetail.published_at).format('MMMM D, YYYY')}</StyledDateOfPost>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '24px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      columnGap: '8px',
                      color: '#54555E',
                      alignItems: 'center',
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: '12px', fontWeight: 600, color: '#54555E' }} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{newsDetail.views_count}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      columnGap: '8px',
                      color: '#54555E',
                      alignItems: 'center',
                    }}
                  >
                    <CommentIcon sx={{ fontSize: '12px', fontWeight: 600, color: '#54555E' }} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>20</Typography>
                  </Box>
                </Box>
              </Box>

              <div style={{ overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>

              <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '16px', paddingTop: '32px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '4px', alignItems: 'center' }}>
                  <LocalOfferIcon sx={{ fontSize: '14px' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Tags</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '8px' }}>
                  {newsDetail.tag.map((item: any, index: number) => {
                    return (
                      <Box key={index} sx={{ bgcolor: '#F7F7F7' }}>
                        <Typography
                          sx={{ padding: '7px 12px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
              <Box sx={{ width: '100%', background: '#F7F7F7', margin: '32px 0' }}>
                <NewsLetter variant="large" />
              </Box>
              <Divider sx={{ borderWidth: '2px', borderColor: 'rgba(17, 15, 36, 0.4)' }} />
              <Box sx={{ padding: '24px 0' }}>
                {listPostByCategory && <RelatedArticles listNews={listPostByCategory.data} />}
              </Box>
              <Divider sx={{ borderWidth: '2px', borderColor: 'rgba(17, 15, 36, 0.4)' }} />

              <Comment />
              <FormComment
                onFilter={(value) => {
                  console.log(value)
                }}
              />
            </WrapperContent>
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

export async function getServerSideProps(context: any) {
  let slug = context?.params.slug || {}

  const response = await fetch(createAbsoluteURLCms(URLs.CMS_POST_DETAIL.replace(':slug', slug)))
  const responseData = await response.json()

  if (!responseData?.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...responseData,
    },
  }
}

export default NewsDetailPage
