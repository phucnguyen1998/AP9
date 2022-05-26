import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material'
import { styled as MuiStyled, Pagination, PaginationProps, PaginationItem, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'

const PreviousItem = MuiStyled((props: any) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      <KeyboardDoubleArrowLeft />
      <span>{t('pagination.previous_item_lable')}</span>
    </div>
  )
})((style: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px !important',
  lineHeight: '16px',
  color: style.theme.palette.text.primary,
  padding: '8px 10px 8px 20px',

  '& .MuiSvgIcon-root': {
    fontSize: 14,
  },
}))

const NextItem = MuiStyled((props: any) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      <span>{t('pagination.next_item_lable')}</span>
      <KeyboardDoubleArrowRight />
    </div>
  )
})((style: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px !important',
  lineHeight: '16px',
  color: style.theme.palette.text.primary,
  padding: '8px 10px 8px 20px',

  '& .MuiSvgIcon-root': {
    fontSize: 14,
  },
}))

const CustomPagination = MuiStyled((props: PaginationProps) => {
  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      color="primary"
      renderItem={(item) => <PaginationItem components={{ previous: PreviousItem, next: NextItem }} {...item} />}
      {...props}
    />
  )
})((style: { theme: Theme }) => ({
  '& .MuiPaginationItem-previousNext': {
    borderRadius: '0 50px 50px 0 ',
    margin: 0,
    padding: 8,
  },
  '& .MuiPagination-ul': {
    justifyContent: 'center',
  },
  '& .MuiPagination-ul li:first-of-type .MuiPaginationItem-previousNext': {
    borderRadius: '50px  0 0 50px',
    margin: 0,
    padding: 8,
  },

  '& .MuiPagination-ul .Mui-selected': {
    backgroundColor: `${style.theme.palette.primary.main} !important`,
    color: '#fff',
  },
  [style.theme.breakpoints.up('lg')]: {
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
    },
  },
}))

export default CustomPagination
