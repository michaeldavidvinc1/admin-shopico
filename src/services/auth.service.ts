import { API_URL } from "@/constant";
import { apiSlice } from "@/services/base-query";
import { setUser } from "./auth-slice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: API_URL.LOGIN,
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const userData = {
                        name: data.data.name,
                        token: data.data.token,
                        email: data.data.email,
                        role: data.data.role,
                    };
            
                    dispatch(setUser(userData));
            
                    localStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("token", data.data.token);
                } catch (err) {
                    console.error("Login failed:", err);
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
