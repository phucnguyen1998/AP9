import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { AuthState } from '../store/slices/authSlice'
import { RootState } from '../store/store'

const withAuth = <P extends Object>(Component: React.ComponentType<P>): React.FC<P> => {
  const AuthPage = (props: any): JSX.Element => {
    const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
    const { user } = authStore
    const [signedIn, setSignedIn] = useState(Boolean(user?.email))

    useEffect(() => {
      setSignedIn(Boolean(user?.email))
    }, [user])

    useEffect(() => {
      const newState = Boolean(user?.email)
      if (signedIn && !newState) {
        Router.replace('/')
      } else if (!signedIn && !newState) {
        Router.replace('/404')
      }
    }, [signedIn, user])

    if (signedIn) {
      return <Component {...props} />
    }
    return <></>
  }

  return AuthPage
}

export default withAuth
