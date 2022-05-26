import { Box, Link as MuiLink, List, ListItem, Typography } from '@mui/material'
import * as React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { NEWS_VARIANT } from '../../../constants/common'
import URLs from '../../../constants/URLs'
import { useCmsApiRequest } from '../../../hooks/useApiRequest'
import NewsItem from '../../cms/newsItem'
import Link from 'next/link'
import { styled as MuiStyled, Theme } from '@mui/material'

interface ITopicBlockProps {
  listCategories: any
}

const Wrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: '51px',
    columnGap: '30px',
  },
}))

const TopicBlock: React.FunctionComponent<ITopicBlockProps> = (props) => {
  const { listCategories } = props

  const renderTopic = () => {
    return (
      listCategories &&
      listCategories.slice(0, 5).map((item: any, index: number) => {
        if (item.name)
          return (
            <Box key={index} sx={{ width: 'calc(50% - 15px)', borderTop: '3px solid rgba(17, 15, 36, 0.4)' }}>
              <Typography sx={{ fontSize: '28px', fontWeight: 700, lineHeight: '40px', padding: '32px 0 12px 0' }}>
                {item.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '30px' }}>
                <Box sx={{ flex: 1 }}>
                  <NewsItem
                    title={item.description}
                    date={item.published_at}
                    description={item.description}
                    category={item.name}
                    image={'/images/post-1.jpeg'}
                    linkPost={`/news/${item.slug}`}
                    variant={NEWS_VARIANT.TOPIC}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      padding: 0,
                      '& > li:first-of-type': {
                        paddingTop: 0,
                      },
                    }}
                  >
                    {[1, 2, 3, 4].map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            columnGap: '10px',
                            padding: '24px 0',
                            borderBottom: '1px solid #cdc',
                          }}
                        >
                          <ChevronRightIcon
                            sx={{ fontSize: '16px', lineHeight: '18.75px', color: '#2D95E3', marginTop: '2px' }}
                          />
                          <Link href={'#'} passHref>
                            <MuiLink sx={{ textDecoration: 'none' }}>
                              <Typography
                                sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '16px', color: '#110F24' }}
                              >
                                Need a Website for Your Business? Google Can Help
                              </Typography>
                            </MuiLink>
                          </Link>
                        </ListItem>
                      )
                    })}
                  </List>
                </Box>
              </Box>
            </Box>
          )
      })
    )
  }

  return <Wrapper>{renderTopic()}</Wrapper>
}

export default TopicBlock
