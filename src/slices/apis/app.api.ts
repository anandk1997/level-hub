import { createApi } from '@reduxjs/toolkit/query/react';
import {
  baseQueryWith401Handler,
  createGetQuery,
  createGetWithParamsQuery,
  createMutationParamQuery,
  createMutationQuery,
  fetchConfig,
} from './config';
import {
  IActArgs,
  IActivityApprove,
  IChangePasswordArgs,
  IForgotPasswordArgs,
  ILevelArgs,
  IResendOtpArgs,
  IResetPasswordArgs,
  ISigninArgs,
  ISigninRes,
  ISignupArgs,
  ISuccessRes,
  ITempArgs,
  IUpdateProfile,
  IVerifyOtpArgs,
} from './types';
import { IFilterAtom } from 'src/store/jotai/activities';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWith401Handler,

  ...fetchConfig,
  tagTypes: ['activities', 'level', 'template', 'profile', 'reports'],

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
      createMutationQuery('/password/change', 'PUT')
    ),

    getProfile: builder.query<ISuccessRes, {}>({
      ...createGetQuery('/profile'),
      providesTags: ['profile'],
    }),
    updateProfile: builder.mutation<ISuccessRes, IUpdateProfile>({
      ...createMutationQuery('/profile', 'PUT'),
      invalidatesTags: (result, error) => (result && !error ? ['profile'] : []),
    }),

    fetchLevel: builder.query<ISuccessRes, {}>({
      ...createGetQuery('/level'),
      providesTags: ['level'],
    }),
    level: builder.mutation<ISuccessRes, ILevelArgs>({
      ...createMutationQuery('/level'),
      invalidatesTags: (result, error) => (result && !error ? ['level'] : []),
    }),

    fetchActivities: builder.query<ISuccessRes, IFilterAtom>({
      ...createMutationQuery('/activity/list'),
      providesTags: ['activities'],
    }),
    fetchActivity: builder.query<ISuccessRes, { id: string }>({
      ...createGetWithParamsQuery('/activity/:id'),
    }),
    upsertActivity: builder.mutation<ISuccessRes, IActArgs>({
      ...createMutationQuery('/activity'),
      invalidatesTags: (result, error) => (result && !error ? ['activities'] : []),
    }),
    approveActivity: builder.mutation<ISuccessRes, IActivityApprove>({
      ...createMutationQuery('/activity/approve', 'PUT'),
      invalidatesTags: (result, error) => (result && !error ? ['activities', 'level'] : []),
    }),

    fetchTemplates: builder.query<ISuccessRes, { search: string; page: number; pageSize: number }>({
      ...createGetQuery('/template'),
      providesTags: ['template'],
    }),
    upserTemplate: builder.mutation<ISuccessRes, ITempArgs>({
      ...createMutationQuery('/template'),
      invalidatesTags: (result, error) => (result && !error ? ['template'] : []),
    }),
    getTemplate: builder.query<ISuccessRes, { id: number }>({
      ...createGetWithParamsQuery('/template/:id'),
    }),
    deleteTemplate: builder.mutation<ISuccessRes, { params: { id: string } }>({
      ...createMutationParamQuery<void, { id: string }>('/template/:id', 'DELETE'),
      invalidatesTags: (result, error) => (result && !error ? ['template'] : []),
    }),

    fetchReports: builder.query<ISuccessRes, { search: string; page: number; pageSize: number }>({
      ...createGetQuery('/report/activity'),
      providesTags: ['reports'],
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

  useUpsertActivityMutation,
  useApproveActivityMutation,

  useUpserTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateProfileMutation,
} = apiSlice;

export const {
  useFetchLevelQuery,
  useFetchActivityQuery,
  useFetchActivitiesQuery,
  useFetchTemplatesQuery,
  useGetTemplateQuery,
  useGetProfileQuery,
  useFetchReportsQuery,
} = apiSlice;
