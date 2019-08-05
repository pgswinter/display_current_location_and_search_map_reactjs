import { 
    getHttpRequestAsync,
    postHttpRequestAsync
} from '../../api';

import { 
    PLACE_BY_TEXT_SEARCH_GOOGLE_API
} from '../patch/GoogleMap';

export const requestSearchMapApi = (query, key) => {
    return postHttpRequestAsync(PLACE_BY_TEXT_SEARCH_GOOGLE_API, {query, key});
}