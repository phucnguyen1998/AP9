import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AuthState } from '../store/slices/authSlice'
import { LayoutState, openAuthDigalog } from '../store/slices/layoutSlice'
import { RootState } from '../store/store'

const requireAuth = <P extends Object>(Component: React.ComponentType<P>): React.FC<P> => {
  const RequireAuthPage = (props: any): JSX.Element => {
    const dispatch = useDispatch()
    const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
    const { user } = authStore
    const layoutStore: LayoutState = useSelector((store: RootState) => store, shallowEqual).layout
    const { showingAuthDigalog } = layoutStore

    const [openedAuthDialog, setOpenedAuthDialog] = useState(showingAuthDigalog)

    useEffect(() => {
      if (!user) {
        dispatch(openAuthDigalog())
      }
    }, [user, openAuthDigalog, dispatch])

    useEffect(() => {
      if (!openedAuthDialog) {
        setOpenedAuthDialog(true)
      }
      if (!showingAuthDigalog && openedAuthDialog && !user) {
        Router.push('/')
      }
    }, [showingAuthDigalog, openedAuthDialog, user])

    if (user) {
      return <Component {...props} />
    }

    return <></>
  }

  return RequireAuthPage
}

export default requireAuth
