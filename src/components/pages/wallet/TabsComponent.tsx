import { Box, Button, Tab, Tabs, TabsUnstyled } from '@mui/material'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { styled as MuiStyled, Theme } from '@mui/material/styles'
import MenuAction from './MenuAction'
import { useTranslation } from 'react-i18next'
import { openFormTransferMoney } from '../../../store/slices/layoutSlice'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CustomTable from '../../CustomTable'
import { GridColumns } from '@mui/x-data-grid'
import { useApiRequest } from '../../../hooks/useApiRequest'
import { RootState } from '../../../store/store'
import URLs from '../../../constants/URLs'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { generateQueriesPath } from '../../../utils/common'
import { CommonState } from '../../../store/slices/commonSlice'

interface ITabsComponentProps {}

const TabsWrapper = MuiStyled(TabsUnstyled)(({ theme }) => ({
  padding: '12px',
  [theme.breakpoints.up('lg')]: {
    padding: 0,
  },
}))

const StyledButton = MuiStyled(Button)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 700,
  textTransform: 'initial',
  padding: '8px 32px',
  lineHeight: '24px',
  boxShadow: 'none',
  height: 40,
}))

const WrapperContent = MuiStyled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '24px',
}))

const WrapperTable = MuiStyled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '24px',
}))

const tabs = {
  REQUEST_TAB: 0,
  VOLATILITY: 1,
}

const TabsComponent: React.FunctionComponent<ITabsComponentProps> = MuiStyled((props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const buttonClearFilter = useRef<any>(null)
  const [selectedTab, setSelectedTab] = useState(tabs.REQUEST_TAB)
  const [filters, setFilters] = useState({})

  const accessToken = useSelector((store: RootState) => store.auth.accessToken, shallowEqual)
  const commonStore: CommonState = useSelector((store: RootState) => store, shallowEqual).common

  const queryParams = generateQueriesPath({ ...filters }, (key: string, value: any) => value && value !== 'all')

  const {
    data: data,
    error: error,
    mutate,
    isValidating,
  } = useApiRequest(
    {
      url: `${
        selectedTab === tabs.REQUEST_TAB ? URLs.AUTH_GET_REQUEST_PAYMENT : URLs.AUTH_GET_TRANSACTIONS
      }?${queryParams}`,
      method: 'GET',
      accessToken,
    },
    {
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    mutate()
  }, [filters, mutate])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.data.data, { variant: 'error' })
    }
  }, [enqueueSnackbar, error])

  const columnsRequestTab: GridColumns = [
    {
      field: 'id',
      width: 60,
      headerName: 'Id',
    },
    {
      field: 'created_at',
      minWidth: 300,
      headerName: t('wallet_page.table_col_withdrawal_request_date'),
      renderCell: (data: any) => {
        return `${dayjs(data.created_at).format('YYYY-MM-DD')}`
      },
    },
    {
      field: 'amount',
      minWidth: 300,
      headerName: t('wallet_page.table_col_amount_that_will_receive'),
      renderCell: (data: any) => {
        return `$${data.value}`
      },
    },
    {
      field: 'code',
      minWidth: 200,
      headerName: t('wallet_page.table_col_transaction_id'),
    },
    {
      field: 'status',
      minWidth: 150,
      headerName: t('wallet_page.table_col_status'),
      renderCell: (data: any) => {
        return (
          <div className={`order-status-${data.value.value}`}>{t(`wallet_page.filter_status_${data.value.value}`)}</div>
        )
      },
    },
    {
      field: 'note',
      minWidth: 100,
      flex: 1,
      headerName: t('wallet_page.table_col_note'),
    },
  ]

  const columnsVolatilityTab: GridColumns = [
    {
      field: 'id',
      minWidth: 200,
      headerName: 'ID',
    },
    {
      field: 'code',
      minWidth: 200,
      headerName: t('wallet_page.table_col_trading_code'),
    },
    {
      field: 'type',
      minWidth: 200,
      headerName: t('wallet_page.table_col_action'),
      renderCell: (data: any) => {
        return <div>{t(`wallet_page.action_${data.value.value}`)}</div>
      },
    },
    {
      field: 'amount',
      minWidth: 200,
      headerName: t('wallet_page.table_col_amount_of_money'),
      renderCell: (data: any) => {
        return `$${data.value}`
      },
    },
    {
      field: 'description',
      minWidth: 400,
      headerName: t('wallet_page.table_col_content'),
    },
    {
      field: 'occurred_at',
      minWidth: 200,
      flex: 1,
      headerName: t('wallet_page.table_col_time'),
    },
  ]

  const statusFilterOptions = (commonStore.configs?.payment_statuses || []).map(
    (status: { name: string; value: number }) => {
      return {
        value: status.value,
        label: t(`wallet_page.filter_status_${status.value}`),
      }
    }
  )

  const actionsFilterOptions = (commonStore.configs?.transaction_types || []).map(
    (status: { name: string; value: number }) => {
      return {
        value: status.value,
        label: t(`wallet_page.action_${status.value}`),
      }
    }
  )

  const handleTabChange = (event: any, value: number) => {
    setSelectedTab(value)
    buttonClearFilter.current.click()
    setFilters({})
  }

  const handleFiltersChange = (values: any) => {
    if (values.startDate) values.startDate = dayjs(values.startDate).format('YYYY-MM-DD')
    if (values.endDate) values.endDate = dayjs(values.endDate).format('YYYY-MM-DD')
    let options
    if (selectedTab === tabs.REQUEST_TAB) {
      options = {
        status: values.status,
        date_from: values.startDate,
        date_to: values.endDate,
        payment_id: values.searchingCode,
      }
    } else {
      options = {
        date_from: values.startDate,
        date_to: values.endDate,
        transaction_id: values.searchingCode,
        'type[]': values.status,
      }
    }
    setFilters(options)
  }

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setFilters({ ...filters, page: newPage })
  }

  return (
    <div {...props}>
      <TabsWrapper defaultValue={tabs.REQUEST_TAB}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label={t('wallet_page.tab_button_request')} />
            <Tab label={t('wallet_page.tab_button_volatility')} />
          </Tabs>
          <StyledButton
            variant="contained"
            onClick={() => {
              dispatch(openFormTransferMoney())
            }}
          >
            {t('wallet_page.tab_button_withdrawal_request')}
          </StyledButton>
        </Box>

        <WrapperContent>
          <MenuAction
            filterOptions={selectedTab === tabs.REQUEST_TAB ? statusFilterOptions : actionsFilterOptions}
            tab={selectedTab}
            onFilter={handleFiltersChange}
            clearFilter={buttonClearFilter}
          />
          <WrapperTable>
            <CustomTable
              columns={selectedTab === tabs.REQUEST_TAB ? columnsRequestTab : columnsVolatilityTab}
              rows={!isValidating && data?.data ? data.data.map((i: any, index: number) => ({ ...i, id: index })) : []}
              loading={isValidating}
              paginationInfo={data?.meta || {}}
              onPageChange={handlePageChange}
            />
          </WrapperTable>
        </WrapperContent>
      </TabsWrapper>
    </div>
  )
})((style: { theme: Theme }) => ({
  minHeight: '100%',
  width: '100%',
  padding: '12px 0',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12,

  '& .table-wrapper': {
    minHeight: 500,
    backgroundColor: '#fff',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 24,
  },

  '& .table-title': {
    fontSize: 20,
    lineHeight: 1.2,
    color: style.theme.palette.text.primary,
    fontWeight: 700,
  },

  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: 16,
    height: 40,
    minWidth: 100,
    minHeight: 40,
    backgroundColor: style.theme.palette.background.default,
  },

  '& .MuiTabs-root .Mui-selected': {
    backgroundColor: style.theme.palette.primary.main,
    color: '#fff !important',
  },

  '& .MuiTabs-indicator': {
    display: 'none',
  },

  '& .MuiPagination-root': {
    marginTop: 24,
  },

  '& .order-status-1': {
    color: '#E67337',
  },
  '& .order-status-2': {
    color: '#039A55',
  },
  '& .order-status-3': {
    color: '#C84040',
  },
  '& .order-status-4': {
    color: '#ff0000',
  },

  '& .MuiDataGrid-cell': {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 600,
    outline: 'none !important',
  },

  [style.theme.breakpoints.up('lg')]: {
    padding: '24px',
    rowGap: 24,
  },

  [style.theme.breakpoints.down('sm')]: {
    '& .table-wrapper': {
      padding: '12px 8px',
      rowGap: 12,
    },
    '& .MuiTab-root': {
      minWidth: 120,
      flex: 1,
      padding: 12,
      minHeight: 0,
    },
  },
}))

export default TabsComponent
