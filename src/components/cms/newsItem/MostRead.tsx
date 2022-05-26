import { Box, Link as MuiLink, Typography } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import ImageSlide from '../ImageSlide'

interface IMostReadProps {
  title: string
  image: string
  linkPost: string
}

const MostRead: React.FunctionComponent<IMostReadProps> = ({ title, image, linkPost }) => {
  console.log(image)

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Link href={linkPost} passHref>
          <ImageSlide
            src={image}
            defaultImage={'/images/post-1.jpeg'}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              cursor: 'pointer',
              '& > span': { borderRadius: '5px' },
            }}
          />
        </Link>
        <Box
          sx={{
            position: 'absolute',
            bottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <Link href={linkPost} passHref>
            <MuiLink
              sx={{
                maxWidth: '80%',
                textDecoration: 'none',
              }}
            >
              <Typography
                sx={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px', color: '#fff', textAlign: 'center' }}
              >
                {title}
              </Typography>
            </MuiLink>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default MostRead
