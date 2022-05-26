import React, { useState, useEffect } from 'react'
import { Link as MuiLink } from '@mui/material'
import { AP9_THEME } from '../constants/theme'

export interface ICountDownProps {
  minutes: number
  seconds?: number
  refreshTime?: number
  onExpire: () => void
}

export default function CountDown({ minutes, seconds = 0, onExpire, refreshTime }: ICountDownProps) {
  const [[m, s], setTime] = useState([minutes, seconds])

  const tick = () => {
    if (m === 0 && s === 0) {
      onExpire()
    } else if (s == 0) {
      setTime([m - 1, 59])
    } else {
      setTime([m, s - 1])
    }
  }

  useEffect(() => {
    if (refreshTime) {
      setTime([minutes, seconds])
    }
  }, [refreshTime, minutes, seconds])

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  })

  return (
    <MuiLink variant="body2" sx={{ textDecoration: 'none', color: AP9_THEME.palette.primary.main }}>
      {`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
    </MuiLink>
  )
}
