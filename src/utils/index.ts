import { clsx, type ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeParam = (param: string) => {
  try {
    const decodedEmail = atob(param);

    return decodedEmail;
  } catch (error) {
    toast.error('error while decode');
    console.error('error while decode', error);
    return '';
  }
};

export const isBase64 = (param: string) => {
  if (!param || param.trim() === '') return false;

  try {
    return btoa(atob(param)) === param;
  } catch (error) {
    return false;
  }
};
