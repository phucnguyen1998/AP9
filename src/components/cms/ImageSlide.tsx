import { Box } from '@mui/material'
import * as React from 'react'
import Image from 'next/image'
import { useState } from 'react'

interface IImageSlideProps {
  src: string
  alt: string
  defaultImage: string
  sx: any
}

const ImageSlide: React.FunctionComponent<IImageSlideProps> = (props) => {
  const { src, alt, defaultImage, sx } = props
  const [srcImg, setSrcImg] = useState(src)

  const handleImageLoadFail = () => {
    if (defaultImage) {
      setSrcImg(defaultImage)
    }
  }

  return (
    <Box sx={sx}>
      <Image src={srcImg} layout="fill" alt={alt} onError={handleImageLoadFail} />
    </Box>
  )
}

export default ImageSlide
