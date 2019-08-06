import {
    REQUEST_LOCATION,
    REQUEST_LOCATION_SUCCESS,
    REQUEST_LOCATION_FAIL
} from '../../actions/LocationMap/LocationMapActionTypes';

const initialState = {
    loading: false,
    isRequested: false,
    data: {},
    error: '',
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_LOCATION:
            return {
                ...state,
                loading: true,
                isRequested: false,
            }
        case REQUEST_LOCATION_SUCCESS:
            return {
                ...state,
                loading: true,
                isRequested: true,
                data: action.payload,
            }
        case REQUEST_LOCATION_FAIL:
            return {
                ...state,
                loading: true,
                isRequested: true,
                error: 'Fail'
            }
        default:
            return state;
    }
}