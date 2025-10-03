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
    // Customers
    getAllCustomers: builder.query({
      query: ({ search = "", role = "", page = "", limit = 10 }) => ({
        url: "/user/getAllUser",
        method: "GET",
        params: {
          search,
          role,
          page,
          limit,
        },
      }),
      providesTags: ["customers"],
    }),
    getCustomerProfileDetail: builder.query({
      query: ({ id }) => ({
        url: `/user/getUserProfile/${id}`,
        method: "GET",
      }),
    }),
    getCustomerEventsDetail: builder.query({
      query: ({ id }) => ({
        url: `/user/getUserProfile/${id}`,
        method: "GET",
      }),
    }),
    // All Events
    getAllEvents: builder.query({
      query: ({ search = "", page = "", limit = 10 }) => ({
        url: "/event/searchEvents",
        method: "GET",
        params: {
          search,
          page,
          limit,
        },
      }),
      providesTags: ["allEvents"],
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
  // Customers
  useGetAllCustomersQuery,
  useGetCustomerProfileDetailQuery,
  useGetCustomerEventsDetailQuery,
  // All Events
  useGetAllEventsQuery,
} = api;
