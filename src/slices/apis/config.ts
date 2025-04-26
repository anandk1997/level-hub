import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { tokenKey } from 'src/utils/constants';
import { env } from 'src/utils/env';
import { getErrorMessage } from './types';
import { logoutUser } from '../reducers/auth.reducer';
import { route } from 'src/utils/constants/routes';

export const createMutationParamQuery = <T = void, P extends Record<string, any> = {}>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) => ({
  query: (arg: { params?: P } & (T extends void ? {} : { body: T })) => {
    let resolvedUrl = url;

    if (arg.params) {
      resolvedUrl = Object.entries(arg.params).reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, encodeURIComponent(value)),
        url
      );
    }

    const request: any = {
      url: resolvedUrl,
      method,
    };

    if ('body' in arg) {
      request.body = arg.body;
    }

    return request;
  },
});

export const createMutationQuery = <T>(url: string, method: 'POST' | 'PUT' | 'PATCH' = 'POST') => ({
  query: (args: T) => ({
    url,
    method,
    body: args,
  }),
});

export const createGetQuery = <T extends Record<string, any>>(url: string) => ({
  query: (params?: T) => {
    const queryString = params
      ? '?' +
        Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
      : '';

    return {
      url: `${url}${queryString}`,
      method: 'GET',
    };
  },
});

export const createGetWithParamsQuery = <T extends Record<string, any>>(url: string) => ({
  query: (params: T) => {
    const resolvedUrl = Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`:${key}`, encodeURIComponent(value)),
      url
    );

    return {
      url: resolvedUrl,
      method: 'GET',
    };
  },
});

const headers = (headers: Headers) => {
  const token = Cookies.get(tokenKey);

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  return headers;
};

export const fetchConfig = {
  // refetchOnReconnect: true,
  // refetchOnFocus: true,

  refetchOnMountOrArgChange: true,
};

const baseQuery = fetchBaseQuery({
  baseUrl: env.API_URL,
  prepareHeaders: headers,
});

// Define the custom base query that checks for 401 status code
export const baseQueryWith401Handler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const { error } = result;

  if (error) toast.error(getErrorMessage(error));

  if (error && error.status === 401) {
    Cookies.remove(tokenKey);
    api.dispatch(logoutUser());
    setTimeout(() => (window.location.href = route.signIn), 1500);
  }

  return result;
};
