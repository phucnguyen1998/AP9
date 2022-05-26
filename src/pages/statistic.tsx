import { styled as MuiStyled, Tab, Tabs, Theme } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual, useSelector } from 'react-redux'
import CustomTable from '../components/CustomTable'
import MoneyInfo, { MoneyInfoType } from '../components/MoneyInfo'
import { AuthState } from '../store/slices/authSlice'
import { RootState } from '../store/store'
import StatisticFilters from '../components/pages/statistic/StatisticFilters'
import { useApiRequest } from '../hooks/useApiRequest'
import URLs from '../constants/URLs'
import { generateQueriesPath } from '../utils/common'
import requireAuth from '../components/requireAuth'

const HeadWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  rowGap: 12,

  [style.theme.breakpoints.up('lg')]: {
    columnGap: 24,
    flexDirection: 'row',
  },
}))

interface TransactionProps {
  campaign_name: string
  id: number
  pub_commission_usd: number
  reason_rejected: string
  sales_time: string
  status: { name: string; value?: number } | string
  transaction_id: string
}

const tabsMap: { [key: number]: string } = {
  0: 'all',
  1: 'campaign',
  2: 'referal',
}

const StatisticPage = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState(0)
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const { user, accessToken } = authStore
  const { wallet } = user || {}
  const [filters, setFilters] = useState({})

  const queryParams = generateQueriesPath(
    { ...filters, type: tabsMap[selectedTab] },
    (key: string, value: any) => value && value !== 'all'
  )
  const { data, mutate, isValidating } = useApiRequest(
    { url: `${URLs.AUTH_CAMPIGN_STATISTIC}?${queryParams}`, method: 'GET', accessToken },
    { revalidateOnMount: true }
  )

  useEffect(() => {
    mutate()
  }, [filters, mutate])

  const columns: GridColumns = [
    {
      field: 'id',
      width: 100,
      headerName: t('statistic_page.col_id'),
    },
    {
      field: 'sales_time',
      minWidth: 180,
      headerName: t('statistic_page.col_buy_date'),
    },
    {
      field: 'campaign_name',
      minWidth: 200,
      flex: 1,
      headerName: t('statistic_page.col_campaign_name'),
    },
    {
      field: 'code',
      minWidth: 200,
      headerName: t('statistic_page.col_transaction_code'),
    },
    {
      field: 'pub_commission_usd',
      minWidth: 200,
      headerName: t('statistic_page.col_benefit_percent'),
      renderCell: (data: any) => {
        return `$${data.value}`
      },
    },
    {
      field: 'status',
      minWidth: 150,
      headerName: t('statistic_page.col_status'),
      renderCell: (data: any) => {
        const status = { ...data.value }
        return <div className={`order-status-${status.value}`}>{t(`statistic_page.order_status_${status.value}`)}</div>
      },
    },
    {
      field: 'reason_rejected',
      minWidth: 100,
      flex: 1,
      headerName: t('statistic_page.col_notes'),
    },
  ]

  const handleTabChange = (event: any, value: number) => {
    setSelectedTab(value)
    setFilters({})
  }

  const handleFiltersChange = (values: any) => {
    setFilters(values)
  }

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setFilters({ ...filters, page: newPage })
  }

  return (
    <div {...props}>
      {authStore.user && (
        <>
          <HeadWrapper>
            <MoneyInfo
              type={MoneyInfoType.WALLET_AVAILABLE_BALANCE}
              title={t('statistic_page.total_earned')}
              amount={wallet?.total_amount || 0}
            />
            <MoneyInfo
              type={MoneyInfoType.CAMPAIGN_APPROVED_AMOUNT}
              title={t('statistic_page.approved_amount')}
              amount={wallet?.approve_amount || 0}
            />
            <MoneyInfo
              type={MoneyInfoType.CAMPAIGN_TEMPORARY_APPROVED_AMOUNT}
              title={t('statistic_page.temporary_approved_amount')}
              amount={wallet?.temp_approve_amount || 0}
            />
            <MoneyInfo
              type={MoneyInfoType.CAMPAIGN_PENDING_AMOUNT}
              title={t('statistic_page.pending_amount')}
              amount={wallet?.pending_amount || 0}
            />
          </HeadWrapper>
          <div className="table-wrapper">
            <div className="table-title">{t('statistic_page.table_title')}</div>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label={t('statistic.tab_all')} />
              <Tab label={t('statistic.tab_campaigns')} />
              <Tab label={t('statistic.tab_referal')} />
            </Tabs>
            <StatisticFilters onFilter={handleFiltersChange} />
            <CustomTable
              columns={columns}
              rows={!isValidating && data?.data ? data.data : []}
              loading={isValidating}
              onPageChange={handlePageChange}
              paginationInfo={data?.meta || {}}
            />
          </div>
        </>
      )}
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
    color: '#C84040',
  },
  '& .order-status-3': {
    color: '#2D95E3',
  },
  '& .order-status-4': {
    color: '#176BFB',
  },
  '& .order-status-5': {
    color: '#039A55',
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
      minWidth: 90,
      flex: 1,
      padding: 12,
    },
  },
}))

export default requireAuth(StatisticPage)
