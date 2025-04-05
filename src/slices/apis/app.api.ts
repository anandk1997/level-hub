import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createGetQuery, createMutationQuery, fetchConfig, headers } from './config';
import { env } from 'src/utils/env';
import {
  IActArgs,
  IChangePasswordArgs,
  IForgotPasswordArgs,
  ILevelArgs,
  IResendOtpArgs,
  IResetPasswordArgs,
  ISigninArgs,
  ISigninRes,
  ISignupArgs,
  ISuccessRes,
  IVerifyOtpArgs,
} from './types';

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: headers,
  }),

  ...fetchConfig,
  tagTypes: ['activities', 'level'],

  endpoints: (builder) => ({
    signin: builder.mutation<ISigninRes, ISigninArgs>(createMutationQuery('/signin')),
    signup: builder.mutation<ISuccessRes, ISignupArgs>(createMutationQuery('/signup')),

    otpSignup: builder.mutation<ISuccessRes, IVerifyOtpArgs>(createMutationQuery('/otp/verify')),
    otpReset: builder.mutation<ISuccessRes, IVerifyOtpArgs>(
      createMutationQuery('/password/verify')
    ),
    resendOtp: builder.mutation<ISuccessRes, IResendOtpArgs>(createMutationQuery('/otp/resend')),

    forgotPassword: builder.mutation<ISuccessRes, IForgotPasswordArgs>(
      createMutationQuery('/password/forgot')
    ),
    resetPassword: builder.mutation<ISuccessRes, IResetPasswordArgs>(
      createMutationQuery('/password/reset', 'PUT')
    ),
    changePassword: builder.mutation<ISuccessRes, IChangePasswordArgs>(
      createMutationQuery('/password/change')
    ),

    fetchLevel: builder.query<ISuccessRes, {}>({
      ...createGetQuery('/level'),
      providesTags: ['level'],
    }),
    level: builder.mutation<ISuccessRes, ILevelArgs>({
      ...createMutationQuery('/level'),
      invalidatesTags: (result, error) => (result && !error ? ['level'] : []),
    }),

    fetchActivities: builder.query<ISuccessRes, {}>({
      ...createGetQuery('/activity'),
      providesTags: ['activities'],
    }),
    addActivity: builder.mutation<ISuccessRes, IActArgs>({
      ...createMutationQuery('/activity'),
      invalidatesTags: (result, error) => (result && !error ? ['activities'] : []),
    }),
  }),
});

export const {
  useSignupMutation,
  useOtpSignupMutation,
  useOtpResetMutation,
  useResendOtpMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLevelMutation,
  useAddActivityMutation,
} = apiSlice;

export const { useFetchLevelQuery, useFetchActivitiesQuery } = apiSlice;
