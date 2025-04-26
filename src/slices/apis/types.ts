import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ErrorResponse {
  message: string;
}

interface IErrorData {
  name: string;
  message: string;
  stack: string;
}

/**
 * Extracts an error message from an RTK Query error response.
 *
 * @param error - The error object from an API call.
 * @returns The extracted error message or a default message.
 */
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const fetchError = error as FetchBaseQueryError;

    if (
      typeof fetchError.data === 'object' &&
      fetchError.data !== null &&
      'message' in fetchError.data
    ) {
      return (fetchError.data as ErrorResponse).message;
    }
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    console.error(error);
    return (error as IErrorData).message;
  }

  return 'An unexpected error occurred.';
}

export interface ISuccessRes {
  success: boolean;
  message: string;
  resultData: any;
}

export interface ISigninRes extends ISuccessRes {
  resultData: {
    user: {
      email: string;
      fullName: string;
      role: string;
    };
    token: string;
  };
}

export interface ISigninArgs {
  email: string;
  password: string;
}

export interface ISignupArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
  phone: string;
  type: string;
}

export interface IVerifyOtpArgs {
  email: string;
  otp: string;
}

export interface IResendOtpArgs {
  email: string;
}

export interface IForgotPasswordArgs {
  email: string;
}

export interface IResetPasswordArgs {
  email: string;
  otp: string;
  password: string;
}

export interface IChangePasswordArgs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ILevelArgs {
  levelXP: number;
}

export interface IActArgs {
  activityId?: string;
  title: string;
  xp: number;
  description: string;
  videoLink: string;
  isRecurring: boolean;
  startDate: string;
  endDate: string;
  assignedDays: string[];
  isSelfAssignment: boolean;
}

export interface IActivityApprove {
  activityIds: number[];
  remarks: string;
}

export interface ITempArgs {
  templateId?: number;
  title: string;
  description: string;
  videoLink: string;
  xp: number;
}
