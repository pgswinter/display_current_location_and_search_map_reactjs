import { all, fork } from 'redux-saga/effects';
import locationSagas from './sagas/LocationMap';
import searchMapSagas from './sagas/SearchMap';

export default function* rootSaga() {
    yield all([
        fork(locationSagas),
        fork(searchMapSagas)
    ]);
}