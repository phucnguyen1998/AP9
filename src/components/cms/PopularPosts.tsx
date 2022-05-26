import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { styled as MuiStyled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import StyledImage from '../StyledImage'
import dayjs from 'dayjs'

interface IPopularPostsProps {
  listPopularPost: any
}

const StyledImagePost = MuiStyled(Avatar)(({ theme }) => ({
  width: '88px',
  height: '88px',
}))

const StyledTitlePost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  cursor: 'pointer',
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

const StyledTitleComponent = MuiStyled(Typography)(({ theme }) => ({
  paddingTop: '16px',
  paddingLeft: '24px',
  paddingBottom: '12px',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '32px',
}))

const PopularPosts: React.FunctionComponent<IPopularPostsProps> = (props) => {
  const { t } = useTranslation()
  const { listPopularPost } = props

  return (
    <List>
      <StyledTitleComponent>{t('cms.popular_component_title')}</StyledTitleComponent>

      {listPopularPost.slice(0, 5).map((item: any, index: number) => (
        <ListItem key={index} sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
          <ListItemAvatar sx={{ paddingRight: '16px' }}>
            <StyledImagePost>
              <StyledImage
                src={item.image}
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </StyledImagePost>
          </ListItemAvatar>
          <Box>
            <Link href={`/news/${item.slug}`} passHref>
              <StyledTitlePost>{item.title}</StyledTitlePost>
            </Link>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Link href="#" passHref>
                <StyledCategory>{item.category}&nbsp;</StyledCategory>
              </Link>
              -<StyledDateOfPost>&nbsp;{dayjs(item.published_at).format('YYYY-MM-DD')}</StyledDateOfPost>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default PopularPosts
