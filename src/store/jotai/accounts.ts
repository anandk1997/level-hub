import { atom, useAtom } from 'jotai';
import { Dayjs } from 'dayjs';

export interface IFormAtom {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Dayjs | null;
  gender: string;
}

export interface IErrorAtom {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

export const initialFormState: IFormAtom = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: null,
  gender: '',
};

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IErrorAtom>>({});

export const useAccountsAtom = () => {
  const [formState, setFormState] = useAtom(formAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  const handleChange = (key: keyof IFormAtom, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string | Record<string, string>[] | undefined> = {};

    // Common required fields
    const requiredFields: [keyof IFormAtom, string][] = [
      ['firstName', 'First name is required'],
      ['lastName', 'Last name is required'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ Phone number validation
    // const phone = formState.phone?.trim();
    // if (!phone || phone.length <= 3) newErrors.phone = 'Phone number is required';
    // else if (!/^\+\d{4,}$/.test(phone)) newErrors.phone = 'Invalid phone number';

    // ✅ Set error state
    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formState,
    setFormState,
    errorState,

    handleChange,
    validate,
  };
};
