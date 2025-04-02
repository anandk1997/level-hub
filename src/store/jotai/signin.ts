import { atom, useAtom } from 'jotai';

export interface IFormAtom {
  email: string;
  password: string;
}

export const initialFormState: IFormAtom = {
  email: '',
  password: '',
};

export const initialErrorState: Partial<IFormAtom> = {};

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IFormAtom>>(initialErrorState);

export const useSigninAtom = () => {
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
      ['email', 'Email is required'],
      ['password', 'Password is required'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ Email validation
    const email = formState.email?.trim();
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // ✅ Set error state
    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formState,
    errorState,

    handleChange,
    validate,
  };
};
