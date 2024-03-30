import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import { getLevelInfo } from "../../localStorage/localStorage";

export const formFieldsApi = createApi({
  reducerPath: "formFieldsApi",
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
    createFormFields: builder.mutation({
      query: (body) => {
        return {
          url: `/form-fields`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),

    getAllFormFields: builder.query({
      query: () => {
        return {
          url: `/form-fields`,
          method: "GET",
        };
      },
      providesTags: ["getAllFormFields"],
    }),

    getFormField: builder.query({
      query: (id) => {
        return {
          url: `/form-fields/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),

    updateFormFields: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/form-fields/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),

    deleteFormField: builder.mutation({
      query: (id) => {
        return {
          url: `/form-fields/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllFormFields"],
    }),
  }),
});

export const {
  useCreateFormFieldsMutation,
  useGetAllFormFieldsQuery,

  useGetFormFieldQuery,

  useUpdateFormFieldsMutation,
  useDeleteFormFieldMutation,
} = formFieldsApi;
