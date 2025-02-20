import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (payload) => ({
                url: API_URL.CATEGORY_CREATE,
                method: "POST",
                body: payload
            })
        }),
        getAllCategory: builder.query({
            query: () => ({
                url: API_URL.GET_ALL_CATEGORY,
                method: "GET",
            })
        })
    })
});

export const {
    useCreateCategoryMutation,
    useGetAllCategoryQuery,
} = categoryApi