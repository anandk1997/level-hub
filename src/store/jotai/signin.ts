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

  return {
    formState,
    setFormState,
    errorState,
    setErrorState,
  };
};
