import { all, call, put, select, take, takeLatest, fork } from 'redux-saga/effects';

import {
    REQUEST_LOCATION,
    REQUEST_LOCATION_SUCCESS,
    REQUEST_LOCATION_FAIL
} from '../../actions/LocationMap/LocationMapActionTypes';

const detectLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        location => resolve(location.coords),
        error => reject(error),
    )
});

function* requestLocationMap() {
    try {
        const payload = yield call(detectLocation);
        debugger
        yield put({ type: REQUEST_LOCATION_SUCCESS, payload });
    } catch (error) {
        yield put({ type: REQUEST_LOCATION_FAIL, error });
    }
}

function* watchRequestLocationMap() {
    yield takeLatest(REQUEST_LOCATION, requestLocationMap)
}

export default function* root() {
    yield all([
        fork(watchRequestLocationMap)
    ])
}

