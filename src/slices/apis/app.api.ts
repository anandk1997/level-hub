import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createGetQuery, createMutationQuery, headers } from './config';
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

  endpoints: (builder) => ({
    signin: builder.mutation<ISigninRes, ISigninArgs>(createMutationQuery('/signin')),
    signup: builder.mutation<ISuccessRes, ISignupArgs>(createMutationQuery('/signup')),

    verifyOtp: builder.mutation<ISuccessRes, IVerifyOtpArgs>(createMutationQuery('/otp/verify')),
    resendOtp: builder.mutation<ISuccessRes, IResendOtpArgs>(createMutationQuery('/otp/resend')),

    forgotPassword: builder.mutation<ISuccessRes, IForgotPasswordArgs>(
      createMutationQuery('/password/forgot')
    ),
    resetPassword: builder.mutation<ISuccessRes, IResetPasswordArgs>(
      createMutationQuery('/password/reset')
    ),
    changePassword: builder.mutation<ISuccessRes, IChangePasswordArgs>(
      createMutationQuery('/password/change')
    ),
    fetchLevel: builder.query<ISuccessRes, {}>(createGetQuery('/level')),
    level: builder.mutation<ISuccessRes, ILevelArgs>(createMutationQuery('/level')),
    fetchActivities: builder.query<ISuccessRes, {}>(createGetQuery('/activities')),
    addActivity: builder.mutation<ISuccessRes, IActArgs>(createMutationQuery('/activities')),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLevelMutation,
  useAddActivityMutation,
} = apiSlice;

export const { useFetchLevelQuery, useFetchActivitiesQuery } = apiSlice;
