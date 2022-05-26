import { Box } from '@mui/material'
import * as React from 'react'
import { NEWS_VARIANT } from '../../../constants/common'
import AllNews from './AllNews'
import FlashNew from './FlashNew'
import MostRead from './MostRead'
import Newest from './Newest'
import FlashNewLarge from './FlashNewLarge'
import Topic from './Topic'
import dayjs from 'dayjs'

interface INewsItemProps {
  title: any
  date: any
  description: any
  category: any
  image: any
  variant: any
  positionImage?: number
  linkPost: any
}

const NewsItem: React.FunctionComponent<INewsItemProps> = (props) => {
  const { title, date, description, category, image, variant, positionImage, linkPost } = props

  const renderNew = () => {
    switch (variant) {
      case NEWS_VARIANT.FLASH_NEW:
        return (
          <FlashNew
            title={title}
            date={dayjs(date).format('YYYY-MM-DD')}
            category={category}
            image={image}
            style={positionImage}
            linkCategory="#"
            linkPost={linkPost}
          />
        )
      case NEWS_VARIANT.NEWEST:
        return (
          <Newest
            title={title}
            date={dayjs(date).format('YYYY-MM-DD')}
            category={category}
            image={image}
            description={description}
            linkCategory="#"
            linkPost={linkPost}
          />
        )
      case NEWS_VARIANT.MOST_READ:
        return <MostRead title={title} image={image} linkPost={linkPost} />
      case NEWS_VARIANT.TOPIC:
        return (
          <Topic
            title={title}
            date={dayjs(date).format('YYYY-MM-DD')}
            image={image}
            linkPost={linkPost}
            category={category}
          />
        )
      case NEWS_VARIANT.FLASH_NEW_LARGE:
        return <FlashNewLarge title={title} category={category} image={image} linkCategory="#" linkPost={linkPost} />
      case NEWS_VARIANT.ALL_NEW:
        return (
          <AllNews
            title={title}
            date={dayjs(date).format('YYYY-MM-DD')}
            category={category}
            image={image}
            style={positionImage}
            description={description}
            linkCategory="#"
            linkPost={linkPost}
          />
        )
      default:
        break
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {renderNew()}
    </Box>
  )
}

export default NewsItem
