import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const api = createApi({
  baseQuery:  fetchBaseQuery({ baseUrl:" http://localhost:5000/api" }),
  reducerPath: "EMSApi",
  tagTypes: ['User', 'KPI', "Task", "Users"],
  endpoints: (build) =>({
    getUsersById: build.query({
      query: (id) =>`user/${id}`,
      providesTags: ["User"]
    }),
    getKPI: build.query({
      query:() =>"kpi",
      providesTags: ["KPI"],
    }),
    getTask: build.query({
      query:() =>`task`,
      providesTags: ["Task"],
    }),
    getUsers: build.query({
      query:() =>`user`,
      providesTags: ["Users"],
    }),

    getReport: build.query({
      query:() =>`report`,
      providesTags: ["Report"],
    }),
    createReport: build.mutation({
      query: (newReport) => ({
        url: `report/create`,
        method: 'POST',
        body: newReport,
      }),
      invalidatesTags: ["Report"],
    }),
    createKPI: build.mutation({
      query: (newKPI) => ({
        url: `kpi/create`,
        method: 'POST',
        body: newKPI,
      }),
      invalidatesTags: ["KPI"],
    }),
    deleteKPI: build.mutation({
      query: ({ id }) => ({
        url: `kpi/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["KPI"],
    }),
    createtask: build.mutation({
      query: (newTask) => ({
        url: `task/create`,
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation({
      query: ({ id }) => ({
        url: `task/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Task"],
    })   
  })
  })
 


export const { useGetUsersByIdQuery, useGetKPIQuery, useGetTaskQuery, useGetUsersQuery, useGetReportQuery, useCreateKPIMutation, useCreateReportMutation, useDeleteKPIMutation, useCreatetaskMutation, useDeleteTaskMutation} = api;