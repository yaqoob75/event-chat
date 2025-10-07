import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://elloapp.duckdns.org",
    baseUrl: "https://1a113cbc1f4d.ngrok-free.app",
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
    // ================= AUTH =================
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

    // ================= CUSTOMERS =================
    getAllCustomers: builder.query({
      query: ({ search = "", role = "", page = "", limit = 10 }) => ({
        url: "/user/getAllUser",
        method: "GET",
        params: { search, role, page, limit },
      }),
      providesTags: ["customers"],
    }),

    getCustomerDetail: builder.query({
      query: ({ id, event, group }) => {
        const params = {};
        if (event) params.event = event;
        if (group) params.group = group;
        return {
          url: `/user/getUserProfile/${id}`,
          method: "GET",
          params: Object.keys(params).length ? params : undefined,
        };
      },
    }),

    // ================= EVENTS =================
    getAllEvents: builder.query({
      query: ({ search = "", page = "", limit = 10 }) => ({
        url: "/event/searchEvents",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["allEvents"],
    }),
    // ================= GROUPS =================

    // ================= SUPPORTS =================
    getAllSupports: builder.query({
      query: ({ search = "", page = "", limit = 10 }) => ({
        url: "/dispute/getDispute",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["allEvents"],
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  // Customers
  useGetAllCustomersQuery,
  useGetCustomerDetailQuery,
  // Events
  useGetAllEventsQuery,
  // Supports
  useGetAllSupportsQuery,
} = api;
