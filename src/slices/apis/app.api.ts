import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createMutationQuery, headers } from './config';
import { env } from 'src/utils/env';
import {
  IChangePasswordArgs,
  IForgotPasswordArgs,
  IResendOtpArgs,
  IResetPasswordArgs,
  ISigninArgs,
  ISignupArgs,
  IVerifyOtpArgs,
} from './types';

export const apiSlice = createApi({
  reducerPath: 'auth',

  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: headers,
  }),

  endpoints: (builder) => ({
    signin: builder.mutation(createMutationQuery<ISigninArgs>('/signin')),
    signup: builder.mutation<void, ISignupArgs>(createMutationQuery('/signup')),

    verifyOtp: builder.mutation<void, IVerifyOtpArgs>(createMutationQuery('/otp/verify')),
    resendOtp: builder.mutation<void, IResendOtpArgs>(createMutationQuery('/otp/resend')),

    forgotPassword: builder.mutation<void, IForgotPasswordArgs>(
      createMutationQuery('/password/forgot')
    ),
    resetPassword: builder.mutation<void, IResetPasswordArgs>(
      createMutationQuery('/password/reset')
    ),
    changePassword: builder.mutation<void, IChangePasswordArgs>(
      createMutationQuery('/tutor/password', 'PUT')
    ),
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
} = apiSlice;

export const {} = apiSlice;
