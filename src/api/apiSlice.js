import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://f30a17d533ac.ngrok-free.app",
    // baseUrl: "https://event-chat-be.vercel.app",
    // baseUrl: "https://elloapp.duckdns.org",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token) {
        if (endpoint !== "getAllGroups") {
          headers.set("Authorization", `Bearer ${token}`);
        }
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
      query: ({
        eventName = "",
        eventType = "",
        page = 1,
        limit = 10,
        coHost,
      }) => {
        const params = { eventName, eventType, page, limit };
        if (coHost) params.coHOst = coHost;
        return {
          url: "/event/searchEvents",
          method: "GET",
          params,
        };
      },
      providesTags: ["allEvents"],
    }),

    getEventDetail: builder.query({
      query: ({ id }) => ({
        url: `/event/eventById?id=${id}`,
        method: "GET",
      }),
    }),

    // ================= GROUPS =================
    getAllGroups: builder.query({
      query: ({ groupType = "", groupName = "", page = "", limit = 10 }) => ({
        url: "/group/getAllGroup",
        method: "GET",
        params: { groupType, groupName, page, limit },
      }),
      providesTags: ["allGroups"],
    }),

    getAllMyGroups: builder.query({
      query: ({ id, search = "", page = "", limit = 10 }) => ({
        url: `/user/getUserProfile/${id}`,
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["myAllGroups"],
    }),

    // ================= SUPPORTS =================
    getAllSupports: builder.query({
      query: ({ search = "", page = "", limit = 10 }) => ({
        url: "/dispute/getDispute",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["allSupports"],
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
  useGetEventDetailQuery,
  // Groups
  useGetAllGroupsQuery,
  useGetAllMyGroupsQuery,
  // Supports
  useGetAllSupportsQuery,
} = api;
