import {
    REQUEST_SEARCH_MAP,
    REQUEST_SEARCH_MAP_SUCCESS,
    REQUEST_SEARCH_MAP_FAIL
} from '../../actions/SearchMap/SearchMapActionTypes';

const initialState = {
    loading: false,
    isRequest: false,
    data: {},
    error: '',
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_SEARCH_MAP:
            return {
                ...state,
                loading: true,
                isRequest: true,
            }
        case REQUEST_SEARCH_MAP_SUCCESS:
            return {
                ...state,
                loading: true,
                isRequest: true,
                data: action.data,
            }
        case REQUEST_SEARCH_MAP_FAIL:
            return {
                ...state,
                loading: true,
                isRequest: true,
                error: 'Fail'
            }
        default:
            return state;
    }
}