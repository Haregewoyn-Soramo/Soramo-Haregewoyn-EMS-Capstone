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
    })
  })
})

export const { useGetUsersByIdQuery, useGetKPIQuery, useGetTaskQuery, useGetUsersQuery} = api;