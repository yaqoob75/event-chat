import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().auth.token;
      // console.log(endpoint, "endpoint");
      const publicEndpoints = ["signUp"];

      if (token && !publicEndpoints.includes(endpoint)) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set("Content-Type", "application/json");
      // headers.set("ngrok-skip-browser-warning", "skip-browser-warning");

      return headers;
    },
  }),

  tagTypes: ["workFlows", "LLMProviders", "externalApis", "chatTranscript"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/users/login/",
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/users/signup/",
        method: "POST",
        body: payload,
      }),
    }),
    ////////////////////  WorkFLow /////////////////////
    getWorkFlows: builder.query({
      query: () => ({
        url: "chat-workflow/workflows/",
        method: "GET",
      }),
      providesTags: ["workFlows"],
    }),
    getActiveWorkFlows: builder.query({
      query: () => ({
        url: `chat-workflow/workflows/active/`,
        method: "GET",
        // params: { is_active },
      }),
      providesTags: ["workFlows"],
    }),

    createWorkFlow: builder.mutation({
      query: (payload) => ({
        url: "chat-workflow/workflows/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["workFlows"],
    }),
    createWorkFlowWithId: builder.mutation({
      query: ({ id, payload }) => ({
        url: `chat-workflow/workflows/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["workFlows"],
    }),
    deleteWorkFlow: builder.mutation({
      query: (id) => ({
        url: `chat-workflow/workflows/${id}/`,
        method: "Delete",
      }),
      invalidatesTags: ["workFlows"],
    }),
    getWorkFlowsConversations: builder.query({
      query: (id) => ({
        url: `chat-workflow/workflows/${id}/conversations/`,
        method: "GET",
      }),
    }),
    getWorkFlowsConversationMessages: builder.query({
      query: (id) => ({
        url: `chat-workflow/workflows-conversations/${id}/messages/`,
        method: "GET",
      }),
    }),
    ////////////////////  providers /////////////////////
    getVoiceProviders: builder.query({
      query: () => ({
        url: "providers/voice-providers/",
        method: "GET",
      }),
      providesTags: ["workFlows"],
    }),
    getTranscriberProviders: builder.query({
      query: () => ({
        url: "providers/transcriber-providers/",
        method: "GET",
      }),
      providesTags: ["workFlows"],
    }),
    getLLMProviders: builder.query({
      query: () => ({
        url: "providers/llm-providers/",
        method: "GET",
      }),
      providesTags: ["LLMProviders"],
    }),
    addLLMProviders: builder.mutation({
      query: (payload) => ({
        url: "user-scope/user-llm/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LLMProviders"],
    }),
    getLLMModels: builder.query({
      query: (id) => ({
        url: `providers/llm-models/?provider_id=${id}`,
        method: "GET",
      }),
    }),

    ////////////////////  External Provider API Keys /////////////////////
    getLLMProvidersForExternalApis: builder.query({
      query: () => ({
        url: "user-scope/user-llm/",
        method: "GET",
      }),
      providesTags: ["externalApis"],
    }),
    //////////////////// chat workflows /////////////////////
    chatForWorkFlow: builder.mutation({
      query: ({ id, payload }) => ({
        url: `chat-workflow/workflows/${id}/chat/`,
        method: "POST",
        body: payload,
      }),
    }),
    //////////////////// chat transcript /////////////////////
    chatTranscript: builder.query({
      query: (id) => ({
        url: `chat-workflow/workflows/${id}/chat-transcript/`,
        method: "GET",
      }),
      providesTags: ["chatTranscript"],
    }),
    connectFacebook: builder.mutation({
      query: (payload) => ({
        url: `user-scope/connect-facebook/`,
        method: "POST",
        body: payload,
      }),
    }),
    connectInstagram: builder.mutation({
      query: (payload) => ({
        url: `user-scope/connect-instagram/`,
        method: "POST",
        body: payload,
      }),
    }),
    connectTelegram: builder.mutation({
      query: (payload) => ({
        url: `user-scope/connect-telegram/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["chatTranscript"],
    }),
    completeFacebookChannel: builder.mutation({
      query: (payload) => ({
        url: `user-scope/complete-facebook-channel/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["chatTranscript"],
    }),
    completeInstagramChannel: builder.mutation({
      query: (payload) => ({
        url: `user-scope/complete-instagram-channel/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["chatTranscript"],
    }),
    channelStatus: builder.mutation({
      query: (payload) => ({
        url: "user-scope/active-inactive-channel/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["chatTranscript"],
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useCreateWorkFlowMutation,
  useGetWorkFlowsQuery,
  useCreateWorkFlowWithIdMutation,
  useDeleteWorkFlowMutation,
  useGetVoiceProvidersQuery,
  useGetTranscriberProvidersQuery,
  useGetLLMProvidersQuery,
  useAddLLMProvidersMutation,
  useGetLLMProvidersForExternalApisQuery,
  useLazyGetLLMModelsQuery,
  useChatForWorkFlowMutation,
  useChatTranscriptQuery,
  useConnectFacebookMutation,
  useCompleteFacebookChannelMutation,
  useGetWorkFlowsConversationsQuery,
  useGetWorkFlowsConversationMessagesQuery,
  useConnectInstagramMutation,
  useCompleteInstagramChannelMutation,
  useConnectTelegramMutation,
  useGetActiveWorkFlowsQuery,
  useChannelStatusMutation,
} = api;
