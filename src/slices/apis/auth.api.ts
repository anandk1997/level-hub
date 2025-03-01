import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createGetArgsQuery, createGetQuery, createPostQuery, headers } from './config';
import { env } from 'src/utils/env';

export const apiSlice = createApi({
  reducerPath: 'auth',

  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: headers,
  }),

  endpoints: (builder) => ({
    getDrawingURL: builder.mutation(createPostQuery('/getDrawingURL')),
    getCADFileURL: builder.mutation(createPostQuery('/getCADFileURL')),
    getFormatList: builder.mutation(createPostQuery('/getFormatList')),
    getAvailableViews: builder.mutation(createPostQuery('/getAvailableViews')),
    storeEnterInfoErrorForSizingConfigId: builder.mutation(createPostQuery('/updateErrorInfo')),
    storeSizingConfigIds: builder.mutation(createPostQuery('/updateConfigSizingIds')),

    getLocations: builder.query(createGetQuery('/getLocations')),
    getLanguages: builder.query(createGetQuery('/getLanguages')),

    getSizingData: builder.query(createGetArgsQuery('/getSizingData')),
    getConfigData: builder.query({
      ...createGetArgsQuery('/getConfigData'),
    }),
  }),
});

export const {
  useGetDrawingURLMutation,
  useGetCADFileURLMutation,
  useGetFormatListMutation,
  useGetAvailableViewsMutation,
  useStoreEnterInfoErrorForSizingConfigIdMutation,
  useStoreSizingConfigIdsMutation,
} = apiSlice;

export const {
  useGetLocationsQuery,
  useGetLanguagesQuery,
  useGetSizingDataQuery,

  useLazyGetConfigDataQuery,
} = apiSlice;
