import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import { getLevelInfo } from "../../localStorage/localStorage";

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const levelInfo = getLevelInfo();
      const token = levelInfo && levelInfo.token ? levelInfo.token : "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createForm: builder.mutation({
      query: (body) => {
        return {
          url: `/form`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllForm"],
    }),

    getAllForm: builder.query({
      query: () => {
        return {
          url: `/form`,
          method: "GET",
        };
      },
      providesTags: ["getAllForm"],
    }),

    getForm: builder.query({
      query: (id) => {
        return {
          url: `/form/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),

    updateForm: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/form/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),

    deleteForm: builder.mutation({
      query: (id) => {
        return {
          url: `/form/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),
  }),
});

export const {
  useCreateFormMutation,
  useGetAllFormQuery,

  useGetFormQuery,

  useUpdateFormMutation,
  useDeleteFormMutation,
} = formApi;
