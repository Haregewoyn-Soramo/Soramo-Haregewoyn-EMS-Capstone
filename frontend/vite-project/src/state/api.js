import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const api = createApi({
  baseQuery:  fetchBaseQuery({ baseUrl:" http://localhost:5000" }),
  reducerPath: "EMSApi",
  tagTypes: ['User', 'KPI', "Task", "Users"],
  endpoints: (build) =>({
    getUsersById: build.query({
      query: (id) =>`api/user/${id}`,
      providesTags: ["User"]
    }),
    getKPI: build.query({
      query:() =>"api/kpi",
      providesTags: ["KPI"],
    }),
    getTask: build.query({
      query:() =>`api/task`,
      providesTags: ["Task"],
    }),
    getUsers: build.query({
      query:() =>`api/user`,
      providesTags: ["Users"],
    }),

    getReport: build.query({
      query:() =>`api/report`,
      providesTags: ["Report"],
    }),
    createReport: build.mutation({
      query: (newReport) => ({
        url: `api/report/create`,
        method: 'POST',
        body: newReport,
      }),
      invalidatesTags: ["Report"],
    }),
    createKPI: build.mutation({
      query: (newKPI) => ({
        url: `api/kpi/create`,
        method: 'POST',
        body: newKPI,
      }),
      invalidatesTags: ["KPI"],
    })
  })
})

export const { useGetUsersByIdQuery, useGetKPIQuery, useGetTaskQuery, useGetUsersQuery, useGetReportQuery, useCreateKPIMutation, useCreateReportMutation} = api;