import { Box, ImageList, ImageListItem, Rating, Typography } from '@mui/material'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import StyledImage from '../StyledImage'
import Link from 'next/link'
import { styled as MuiStyled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

interface IRecommentPostProps {
  recommentPost: any
}

const useStyles = makeStyles((theme) => ({
  styledListImage: {
    '& > li:last-child': {
      paddingBottom: 0,
    },
  },
}))

const StyledTitlePost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  paddingTop: '24px',
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

const RecommentPost: React.FunctionComponent<IRecommentPostProps> = (props) => {
  const { recommentPost } = props

  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: '24px' }}>
        {t('cms.recomment_component_title')}
      </Typography>
      <ImageList
        className={classes.styledListImage}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}
      >
        {recommentPost.map((item: any, index: number) => (
          <ImageListItem
            key={index}
            sx={{
              paddingBottom: '32px',
            }}
          >
            <StyledImage
              src={item.img}
              sx={{
                '& > span > img': {
                  maxHeight: '100%!important',
                  maxWidth: '100%!important',
                },
              }}
            />
            <Link href={`/news/${item.slug}`} passHref>
              <StyledTitlePost>{item.title}</StyledTitlePost>
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '8px', paddingBottom: '8px' }}>
              <Link href="#" passHref>
                <StyledCategory>{item.category}&nbsp;</StyledCategory>
              </Link>
              <StyledDateOfPost>-&nbsp;{item.date}</StyledDateOfPost>
            </Box>
            <Rating size="small" name="read-only" value={item.ratingStar} readOnly />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default RecommentPost
