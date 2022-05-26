import { Stack, styled as MuiStyled, Theme } from '@mui/material'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import CustomPagination from './CustomPagination'

export type CustomTableProps = Omit<DataGridProps, 'onPageChange'> & {
  paginationInfo?: any
  onPageChange?: (event: ChangeEvent<unknown>, page: number) => void
  loading?: boolean
}

const CustomTable = MuiStyled((props: CustomTableProps) => {
  const { className, onPageChange, paginationInfo, columns, loading = false, ...other } = props
  const { t } = useTranslation()

  return (
    <div className={className}>
      <DataGrid
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
        loading={loading}
        columns={columns.map((col) => ({ headerAlign: 'center', align: 'center', sortable: false, ...col }))}
        localeText={{
          noRowsLabel: t('customer_table.noRowsLabel'),
        }}
        {...other}
        hideFooter
      />
      <CustomPagination
        count={paginationInfo?.last_page}
        page={paginationInfo?.current_page || 1}
        variant="outlined"
        shape="rounded"
        color="primary"
        onChange={onPageChange}
      />
    </div>
  )
})((style: { theme: Theme }) => ({
  '& .MuiDataGrid-root': {
    border: 'none',
    backgroundColor: '#fff',
  },

  '& .MuiDataGrid-columnHeaders': {
    borderBottom: 'none',
    backgroundColor: style.theme.palette.background.default,
    minHeight: '42px !important',
    height: '42px !important',
  },

  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus, ': {
    outline: 'none !important',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    textTransform: 'uppercase',
    fontWeight: 700,
    color: style.theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontSize: 14,
  },

  '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none !important',
  },
}))

export default CustomTable
