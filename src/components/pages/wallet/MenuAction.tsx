import { Search } from '@mui/icons-material'
import { Box, BoxProps, Button, InputAdornment, styled as MuiStyled, TextField, Theme } from '@mui/material'
import { MuiStyledOptions } from '@mui/system'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AP9Select from '../../AP9Select'
import CustomDatePicker from '../../CustomDatePicker'

export interface MenuActionProps extends BoxProps {
  onFilter?: (values: any) => void
  filterOptions: any
  tab?: any
  clearFilter: any
}

const MenuAction = MuiStyled((props: MenuActionProps) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Date | null | unknown>(null)
  const [endDate, setEndDate] = useState<Date | null | unknown>(null)
  const [selectedStatus, setSelectedStatus] = useState<any>('')
  const [searchingCode, setSearchingCode] = useState('')

  const { onFilter, className, filterOptions, tab, clearFilter, ...other } = props

  const handleDateChange = (name: string) => (date: any, keyboardInputValue: any) => {
    if (name === 'startDate') {
      setStartDate(date)
    } else {
      setEndDate(date)
    }
  }

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value)
  }

  const handleFilterClick = () => {
    if (typeof onFilter === 'function') {
      onFilter({ startDate, endDate, status: selectedStatus, searchingCode })
    }
  }

  const clearFilters = () => {
    setStartDate(null)
    setEndDate(null)
    setSearchingCode('')
    setSelectedStatus('')

    handleFilterClick()
  }

  return (
    <Box className={['filters-wrapper', className].join(' ')}>
      <div className="item-wrapper">
        <CustomDatePicker
          placeholder={t('wallet_page.start_date')}
          value={startDate}
          onChange={handleDateChange('startDate')}
        />
      </div>
      <div className="item-wrapper">
        <CustomDatePicker
          placeholder={t('wallet_page.end_date')}
          value={endDate}
          onChange={handleDateChange('endDate')}
        />
      </div>
      <div className="item-wrapper">
        <AP9Select
          id="status-filters"
          label={tab === 0 ? t('wallet_page.status_filter_label') : t('wallet_page.action_filter_label')}
          value={selectedStatus}
          options={filterOptions}
          onChange={handleStatusChange}
          useLabelAsPlaceholder
        />
      </div>

      <div className="item-wrapper">
        <TextField
          fullWidth
          value={searchingCode}
          variant="outlined"
          className="search-code"
          placeholder={t('statistic_page.transaction_code_search_label')}
          onChange={(event: any) => {
            setSearchingCode(event.target.value)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="item-wrapper">
        <Button variant="contained" color="primary" onClick={handleFilterClick}>
          {t('statistic_page.filter_button')}
        </Button>
        <Button ref={clearFilter} variant="outlined" color="primary" onClick={clearFilters}>
          {t('statistic_page.clear_filter_button')}
        </Button>
      </div>
    </Box>
  )
})((style: { theme: Theme }) => ({
  '&.filters-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
  },

  '& .search-code': {
    backgroundColor: style.theme.palette.background.default,
  },

  '& .search-code input': {
    padding: '8px 14px 8px 0',
  },
  '& .search-code fieldset': {
    border: '1px solid #ECECEE',
  },
  '& .search-code:hover fieldset': {
    borderColor: style.theme.palette.text.secondary,
  },

  '& .item-wrapper': {
    display: 'flex',
    columnGap: 16,
  },

  '& .item-wrapper button': {
    flex: 1,
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 700,
  },

  '& .useLabelAsPlaceholder label': {
    fontSize: '16px !important',
    lineHeight: '24px !important',
    color: `${style.theme.palette.text.secondary} !important`,
    transform: 'translate(8px, 8px) scale(1) !important',
  },

  '& input:placeholder': {
    color: style.theme.palette.text.secondary,
  },

  [style.theme.breakpoints.up('lg')]: {
    '&.filters-wrapper': {
      flexDirection: 'row',
      columnGap: 16,
    },

    '& .item-wrapper': {
      width: 180,
      minWidth: 180,
    },
  },
}))

export default MenuAction
