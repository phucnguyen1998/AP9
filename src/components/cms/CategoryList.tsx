import { Box, Typography } from '@mui/material'
import * as React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface ICategoriesProps {
  Categories: any
}

const Categories: React.FunctionComponent<ICategoriesProps> = (props) => {
  const { Categories } = props

  const { t } = useTranslation()

  return (
    <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: '32px' }}>
        {t('cms.category_component_title')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '18px', paddingTop: '24px' }}>
        {Categories &&
          Categories.map((item: any, index: number) => {
            if (item.categoryName)
              return (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '12px', alignItems: 'center' }}>
                    <ChevronRightIcon sx={{ fontSize: '16px', lineHeight: '18.75px', color: '#2D95E3' }} />
                    <Link href={`/category/${item.slug}`} passHref>
                      <Typography sx={{ fontSize: '16px', fontWeight: '400', cursor: 'pointer' }}>
                        {item.categoryName}
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ borderRadius: '5px', background: '#F2F3F5', display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '400', padding: '7px 12px' }}>
                      {item.totalPost}
                    </Typography>
                  </Box>
                </Box>
              )
          })}
      </Box>
    </Box>
  )
}

export default Categories
