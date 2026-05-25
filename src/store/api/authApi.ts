import { baseApi } from "./baseApi";
import type { ApiResponse, LoginResponse } from "@/lib/type/apiTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiResponse<LoginResponse>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutApi: builder.mutation<ApiResponse<void>, { token: string }>({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutApiMutation } = authApi;
