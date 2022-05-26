import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { styled as MuiStyled } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import { useTranslation } from 'react-i18next'
import { Box, Pagination, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface TableProps {
  columns: any
  rows: any
}

const useStyles = makeStyles((theme: Theme) => ({
  customPagination: {
    '& > ul > li:first-child > button': {
      width: '97px',
      borderRadius: '50px 0 0 50px',
      border: '1px solid #ECECEE!important',
    },
    '& > ul > li:last-child > button': {
      width: '97px',
      borderRadius: '0 50px 50px 0',
      border: '1px solid #ECECEE!important',
    },
    '& > ul > li > button': { borderRadius: 0, margin: 0, borderLeft: 0, borderRight: 0, borderColor: '#ECECEE' },
    '& > ul > li > button.Mui-selected': { color: '#fff', border: '1px solid #176BFB', backgroundColor: '#176BFB' },
    '& > ul > li > .MuiPaginationItem-root': { borderRadius: 0, margin: 0 },
  },
}))

const StyledPagination = MuiStyled(Box)((style: { theme: Theme }) => ({
  display: 'none',
  [style.theme.breakpoints.up('lg')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    paddingTop: '24px',
  },
}))

export default function StickyHeadTable({ columns, rows }: TableProps) {
  const { t } = useTranslation()
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any, index: number) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    padding: column.padding,
                    fontWeight: column.fontWeight,
                    textTransform: column.textTransform,
                  }}
                >
                  {t(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => {
              return (
                <TableRow tabIndex={-1} key={index}>
                  {columns.map((column: any, index: number) => {
                    return (
                      <TableCell key={index} align={column.align}>
                        {column.render(row)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledPagination>
        <Pagination
          className={classes.customPagination}
          count={5}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </StyledPagination>
    </Paper>
  )
}
