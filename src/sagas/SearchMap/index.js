import { all, fork, select, call, put, take, takeLatest } from 'redux-saga/effects';

import {
    REQUEST_SEARCH_MAP,
    REQUEST_SEARCH_MAP_SUCCESS,
    REQUEST_SEARCH_MAP_FAIL
} from '../../actions/SearchMap/SearchMapActionTypes';

import { requestSearchMapApi } from '../../api/GoogleMap';

function* requestSearchMap(params) {
    const { payload } = params
    try {
        const response = yield call(requestSearchMapApi, payload);
        const { data } = response;
        yield put({ type: REQUEST_SEARCH_MAP_SUCCESS, data });
    } catch (error) {
        yield put({ type: REQUEST_SEARCH_MAP_FAIL, error });
    }
}

function* watchRequestSearchMap() {
    yield takeLatest(REQUEST_SEARCH_MAP, requestSearchMap);
}

export default function* root() {
    yield all([
        fork(watchRequestSearchMap)
    ])
}
