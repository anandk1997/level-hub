import { clsx, type ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeBase64 = (input: string) => {
  return btoa(
    new TextEncoder().encode(input).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
};

export const decodeBase64 = (input: string) => {
  try {
    const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new TextDecoder().decode(bytes);
  } catch (error) {
    throw new Error('Invalid Base64 string');
  }
};

export const decodeParam = (param: string): string => {
  try {
    return decodeBase64(param);
  } catch (error) {
    toast.error('Error while decoding');
    console.error('Error while decoding', error);
    return '';
  }
};

// Function to check if a string is a valid Base64 encoded value
export const isBase64 = (param: string): boolean => {
  if (!param || param.trim() === '') return false;

  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(param);
};

export const encodeQueryParams = (baseUrl: string, params: Record<string, string>): string => {
  const queryString = Object.entries(params)
    .filter(([key, value]) => key.trim() !== '' && value.trim() !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(encodeBase64(key))}=${encodeURIComponent(encodeBase64(value))}`
    )
    .join('&');

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const decodeQueryParams = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search);
  const decodedParams: Record<string, string> = {};

  params.forEach((value, key) => {
    try {
      const decodedKey = decodeBase64(key);
      const decodedValue = decodeBase64(value);
      decodedParams[decodedKey] = decodedValue;
    } catch (error) {
      toast.error('Some query parameters could not be decoded.');
      console.error(`Error decoding: key=${key}, value=${value}`, error);
    }
  });

  return decodedParams;
};

export const filterValues = (payload: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) =>
        (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) && value !== undefined && value !== null && value !== '')
    )
  );
