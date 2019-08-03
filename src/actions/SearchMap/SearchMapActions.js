import { REQUEST_SEARCH_MAP } from './SearchMapActionTypes';

export const requestSearchMap = payload => {
    return {
        type: REQUEST_SEARCH_MAP,
        payload
    }
};