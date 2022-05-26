import { createAction } from '@reduxjs/toolkit'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import URLs from '../../constants/URLs'
import { APIRequestOptions, createAppAPIRequest } from '../../hooks/useApiRequest'
import { getProfileSuccess, signout } from '../slices/authSlice'

function* getUserProfile(action: any): Generator<any> {
  try {
    const requestOpt: APIRequestOptions = {
      url: URLs.AUTH_GET_PROFILE,
      method: 'GET',
      accessToken: action.payload.access_token,
    }
    const response: any = yield call(createAppAPIRequest, requestOpt)
    yield put(getProfileSuccess(response.data))
  } catch (error) {
    yield put(signout())
  }
}

const signInSuccessAction = createAction('auth/signinSuccess')

function* worker() {
  yield takeEvery(signInSuccessAction, getUserProfile)
}

export default function* authSaga() {
  yield all([worker()])
}
