import { styled as MuiStyled, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { Container } from '../components/Layout/styled'
import AP9Select from '../components/AP9Select'
import { HomePageCampaignListConfig, HomePageCampaignLists } from '../constants/configs'
import CampaignList from '../components/CampaignList'
import { useApiRequest } from '../hooks/useApiRequest'
import URLs from '../constants/URLs'
import Loader from '../components/Loader'
import { generateQueriesPath, getURLQueries } from '../utils/common'
import CustomPagination from '../components/CustomPagination'

const Filters = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const { value, onChange, ...others } = props
  const allOption = {
    id: 'all',
    label: t('campaigns_page.all_option'),
    value: 'all',
  }
  const typeOptions = HomePageCampaignLists.map(({ type, title }: HomePageCampaignListConfig) => ({
    id: `${type}`,
    label: t(title as string),
    value: `${type}`,
  }))
  const categoryOptions = [allOption]
  const priceOptions = [allOption]
  typeOptions.unshift(allOption)

  return (
    <div {...others}>
      <AP9Select
        id="campaign-type-filter"
        options={typeOptions}
        value={value.type}
        label={t('campaigns_page.campaign_type_filter_label')}
        onChange={onChange('type')}
      />
      <AP9Select
        id="campaign-category-filter"
        options={categoryOptions}
        value={value.category}
        label={t('campaigns_page.campaign_category_filter_label')}
        onChange={onChange('category')}
      />
      <AP9Select
        id="campaign-price-filter"
        options={priceOptions}
        value={value.price}
        label={t('campaigns_page.campaign_price_filter_label')}
        onChange={onChange('price')}
      />
    </div>
  )
})((style: { theme: Theme }) => ({
  display: 'flex',
  width: '100%',
  backgroundColor: '#fff',
  padding: '18px 24px 12px 24px',
  columnGap: 12,
  justifyContent: 'flex-start',

  [style.theme.breakpoints.up('lg')]: {
    '& .MuiFormControl-root ': {
      maxWidth: 200,
    },
  },
}))

const CampaignsPage = MuiStyled((props: any) => {
  const queryParams = getURLQueries()
  const [type, setType] = useState(queryParams.type || '')
  const [category, setCategory] = useState(queryParams.category || '')
  const [price, setPrice] = useState(queryParams.price || '')
  const [page, setPage] = useState(queryParams.page || 1)

  const { data, error, isValidating, mutate } = useApiRequest({
    url: `${URLs.CAMPAIGN_LIST}?${generateQueriesPath({ page, price, type, category }, (key: string, value: string) => {
      return value !== '' && value !== 'all'
    })}`,
    method: 'GET',
  })

  useEffect(() => {
    mutate()
  }, [type, page, category, price, mutate])

  const handleFilterChange = (name: string) => (value: any) => {
    switch (name) {
      case 'type':
        setType(value)
        break

      case 'category':
        setCategory(value)
        break

      case 'price':
        setPrice(value)
        break

      case 'page':
        setPage(value)
        break

      default:
        break
    }
  }

  if (error) {
    Router.replace('/500')
    return null
  }

  return (
    <div {...props}>
      <div className="filters-wrapper">
        <Container>
          <Filters value={{ type, category, price }} onChange={handleFilterChange} />
        </Container>
      </div>

      <div className="campaigns">
        {isValidating && <Loader />}
        {!isValidating && (
          <CampaignList
            items={data?.data ? [...data?.data, ...data?.data] : []}
            id="campaigns"
            showAllItems
            itemsPerRow={{ desktop: 6 }}
          />
        )}
        {data?.meta?.last_page && (
          <CustomPagination
            count={data?.meta?.last_page}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={handleFilterChange('page')}
          />
        )}
      </div>
    </div>
  )
})((style: { theme: Theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  '& .filters-wrapper': {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  '& .MuiPagination-ul': {
    justifyContent: 'center',
    marginBottom: 32,
  },

  '& .campaigns': {
    marginTop: 70,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    rowGap: 32,
    position: 'relative',
  },

  [style.theme.breakpoints.up('lg')]: {
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
    },

    '& .campaigns': {
      padding: 24,
    },
  },
}))

export default CampaignsPage
