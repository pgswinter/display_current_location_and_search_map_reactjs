import { REQUEST_LOCATION } from './LocationMapActionTypes';

export const requestLocationMap = payload => {
    return {
        type: REQUEST_LOCATION,
        payload
    }
};