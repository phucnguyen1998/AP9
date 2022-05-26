import * as React from 'react'
import { NEWS_LETTER } from '../../../constants/common'
import NewsLetterSmall from './NewsLetter'
import NewsLetterLarge from './NewsLetterLarge'

interface INewsLetterProps {
  variant: string
  handleSignUp?: (values: any) => void
}

const NewsLetter: React.FunctionComponent<INewsLetterProps> = (props) => {
  const { variant, handleSignUp } = props
  const renderNewsLetter = () => {
    switch (variant) {
      case NEWS_LETTER.SMALL:
        return <NewsLetterSmall handleSignUp={handleSignUp} />
      case NEWS_LETTER.LARGE:
        return <NewsLetterLarge handleSignUp={handleSignUp} />
      default:
        break
    }
  }

  return <>{renderNewsLetter()}</>
}

export default NewsLetter
