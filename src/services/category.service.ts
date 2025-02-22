import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (payload) => ({
                url: API_URL.CATEGORY_CREATE,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ['Category']
        }),
        getAllCategory: builder.query({
            query: () => ({
                url: API_URL.GET_ALL_CATEGORY,
                method: "GET",
            }),
            providesTags: ['Category']
        }),
        getSingleCategory: builder.query({
            query: (slug: string) => ({
                url: API_URL.GET_SINGLE_CATEGORY(slug),
                method: "GET",
            }),
            providesTags: ['Category']
        }),
        updateProduct: builder.mutation({
            query: ({payload, slug} : { payload: FormData; slug: string }) => ({
                url: API_URL.UPDATE_CATEGORY(slug),
                method: "PUT",
                body: payload
             }),
             invalidatesTags: ['Category']
        }),
    })
});

export const {
    useCreateCategoryMutation,
    useGetAllCategoryQuery,
    useGetSingleCategoryQuery,
    useUpdateProductMutation
} = categoryApi