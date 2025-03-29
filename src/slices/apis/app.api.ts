import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createMutationQuery, headers } from './config';
import { env } from 'src/utils/env';
import {
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
      createMutationQuery('/tutor/password', 'PUT')
    ),
    level: builder.mutation<ISuccessRes, ILevelArgs>(createMutationQuery('level')),
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
} = apiSlice;

export const {} = apiSlice;
