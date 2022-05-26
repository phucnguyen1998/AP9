import NextImage from 'next/image'
import { styled as MuiStyled } from '@mui/material'
import { useRef, useState } from 'react'

const ImageWrapper = MuiStyled('div')({
  position: 'relative',
  height: '100%',
  width: '100%',

  '& span': {
    position: 'relative !important',
    width: '100% !important',
    height: '100% !important',
  },
  '& img': {
    width: '100% !important',
    height: 'auto !important',
    position: 'relative !important',
    maxWidth: 'none !important',
    maxHeight: 'none !important',
  },

  '&.height-auto img': {
    height: '100% !important',
    width: 'auto !important',
    position: 'relative !important',
  },
})

const StyledImage = (props: any) => {
  const { sx, className, defaultImage, src, ...other } = props
  const [imgSrc, setImgSrc] = useState(src)
  const [orgSize, setOrgSize] = useState({ width: 0, height: 0 })
  const wrapperRef = useRef(null)

  const handleImageLoadFail = () => {
    if (defaultImage) {
      setImgSrc(defaultImage)
    }
  }

  const handleImageLoad = (event: any) => {
    const { naturalWidth, naturalHeight } = event?.target || {}
    setOrgSize({ width: naturalWidth || 0, height: naturalHeight || 0 })
  }

  let scaleClass = ''
  if (wrapperRef?.current && orgSize.width > 0 && orgSize.height > 0) {
    const { offsetWidth, offsetHeight } = wrapperRef.current
    if (offsetWidth / offsetHeight < orgSize.width / orgSize.height) {
      scaleClass = 'height-auto'
    }
  }

  return (
    <ImageWrapper sx={sx} className={[className, scaleClass].join(' ')} ref={wrapperRef}>
      <NextImage src={imgSrc} layout="fill" {...other} onError={handleImageLoadFail} onLoad={handleImageLoad} />
    </ImageWrapper>
  )
}

export default StyledImage
