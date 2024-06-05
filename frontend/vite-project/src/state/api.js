import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const api = createApi({
  baseQuery:  fetchBaseQuery({ baseUrl:" http://localhost:5000" }),
  reducerPath: "EMSApi",
  tagTypes: ['User'],
  endpoints: (build) =>({
    getUsersById: build.query({
      query: (id) =>`api/user/${id}`,
      providesTags: ["User"]
    })
  })
})

export const { useGetUsersByIdQuery } = api;