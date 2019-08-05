import axios from 'axios';

export const getHttpRequestAsync = async (url, params) => {
    const { query } = params;
    return await axios.get(url, {
        params: query
    });
};

export const postHttpRequestAsync = async (url, params) => {
    const { query } = params;
    return await axios.post(url, {
        data: query
    });
};

export const getHttpRequest = (url, config = {}) => axios.get(url, config);

// export const postHttpRequestAsync = async (url, data = {}, config = {}) => await axios.post(url, data, config);
export const postHttpRequest = (url, data = {}, config = {}) => axios.post(url, data, config);

export const putHttpRequestAsync = async (url, data = {}, config = {}) => await axios.put(url, data, config);

export const patchHttpRequestAsync = async (url, data = {}, config = {}) => await axios.patch(url, data, config);

export const deleteHttpRequestAsync = async (url, config = {}) => await axios.delete(url, config);