import { Box, Link as MuiLink, Typography } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import StyledImage from '../../StyledImage'
import { styled as MuiStyled } from '@mui/material/styles'

interface ITopicProps {
  title: string
  image: string
  category: string
  date: string
  linkPost: string
}

const StyledCategory = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  lineHeight: '15.08px',
  color: '#FFF',
  cursor: 'pointer',
}))

const StyledDateOfPost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '15.08px',
  textTransform: 'uppercase',
  color: '#FFF',
}))

const Topic: React.FunctionComponent<ITopicProps> = ({ title, image, category, date, linkPost }) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Link href={linkPost} passHref>
          <StyledImage
            src={image}
            defaultImage={'/images/post-1.jpeg'}
            sx={{
              cursor: 'pointer',
              height: '100%',
              '& > span': { borderRadius: '5px' },
              '& > span > img': {
                maxHeight: '100%!important',
                maxWidth: '100%!important',
              },
            }}
          />
        </Link>
        <Box
          sx={{
            position: 'absolute',
            bottom: '24px',
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <Link href={linkPost} passHref>
            <MuiLink
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px',
                color: '#fff',
                textAlign: 'left',
                textDecoration: 'none',
              }}
            >
              <Typography sx={{ fontSize: '20px', fontWeight: 700, lineHeight: '24px' }}>{title}</Typography>
            </MuiLink>
          </Link>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '28px' }}>
            <Link href={linkPost} passHref>
              <StyledCategory>{category}&nbsp;</StyledCategory>
            </Link>
            <StyledDateOfPost>-&nbsp;{date}</StyledDateOfPost>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Topic
