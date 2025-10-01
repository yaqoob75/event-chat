import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://elloapp.duckdns.org",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["eventChat"],

  endpoints: (builder) => ({
    // Auth API's
    login: builder.mutation({
      query: (payload) => ({
        url: "/userAuth/login",
        method: "POST",
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/userAuth/sendMailForResetPassword",
        method: "POST",
        body: payload,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "/userAuth/verifyOtp",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/userAuth/resetPassword",
        method: "POST",
        body: payload,
      }),
    }),
     updatePassword: builder.mutation({
      query: (payload) => ({
        url: "/userAuth/updatePassword",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  // Auth API's
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = api;
