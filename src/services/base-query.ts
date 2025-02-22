import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import {config} from "../config";

const baseQuery = fetchBaseQuery({
    baseUrl: config.api_host_dev,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Accept', 'application/json');
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["Category"],
    endpoints: () => ({}),
});