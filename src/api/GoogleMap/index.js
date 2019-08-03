import { 
    getHttpRequestAsync
} from '../../api';

import { 
    PLACE_BY_TEXT_SEARCH_GOOGLE_API
} from '../patch/GoogleMap';

export const requestSearchMapApi = (query, key) => {
    return getHttpRequestAsync(PLACE_BY_TEXT_SEARCH_GOOGLE_API, {query, key});
}