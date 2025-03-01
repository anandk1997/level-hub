import { env } from 'src/utils/env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tagDataSlice = createApi({
  reducerPath: 'public',
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),

  endpoints: (builder) => ({
    getTagData: builder.query({
      query: (sizing_id) => `/${sizing_id}`,

      transformResponse: (response: any) => {
        const data = response?.length ? response[0] : null;
        if (!data) {
          return {
            tagData: {},
            tagSummary: {},
          };
        }

        const pressure_uom = data.pressure_uom?.split('.')[1] || '';

        return {
          tagData: {
            lastModified: data.created_at || 'select a tag',
            setPressure: parseFloat(data.set_pressure || 0).toFixed(3) + ' ' + pressure_uom,
            quantity: 'select a tag',
            model: data.model || 'select a tag',
            catalogString: 'select a tag',
          },
          tagSummary: {
            company: 'select a tag',
            project: 'select a tag',
            setPressure: parseFloat(data.set_pressure || 0).toFixed(3) + ' ' + pressure_uom,
            model: data.model || 'select a tag',
            catalogString: 'select a tag',
          },
        };
      },
    }),
  }),
});

export const { useGetTagDataQuery } = tagDataSlice;
