import { atom, useAtom } from 'jotai';
import { Dayjs } from 'dayjs';

export type OptionType = { label: string; value: string };
export type RoleType = '' | 'gym' | 'coach' | 'individual' | 'parent';

export type ChildType = {
  age: OptionType | null;
  gender: string;
};

export interface IFormAtom {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dob: Dayjs | null;
  day: OptionType | null;
  month: OptionType | null;
  year: OptionType | null;
  gender: string;
  role: RoleType;
  gymName: string;
  childrens: OptionType | null;
  agreeToTerms: boolean;
  childrenData: ChildType[];
}

export interface IErrorAtom {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dob: string;
  day: string;
  month: string;
  year: string;
  gender: string;
  role: string;
  gymName: string;
  childrens: string;
  agreeToTerms: string;
  childrenData: { age: string; gender: string }[];
}

export const initialFormState: IFormAtom = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  dob: null,
  day: null,
  month: null,
  year: null,
  gender: '',
  role: '',
  gymName: '',
  childrens: null,
  agreeToTerms: false,
  childrenData: [],
};

export const initialErrorState: Partial<IErrorAtom> = {
  childrenData: [],
};

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IErrorAtom>>(initialErrorState);

export const useSignupAtom = () => {
  const [formState, setFormState] = useAtom(formAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  // Function to update childrenData dynamically
  const updateChildrenData = (index: number, key: keyof ChildType, value: any) => {
    setFormState((prev) => {
      const updatedChildren = [...prev.childrenData];
      updatedChildren[index] = { ...updatedChildren[index], [key]: value };
      return { ...prev, childrenData: updatedChildren };
    });

    // Clear error state for the specific child field
    setErrorState((prev) => {
      const updatedErrors = [...(prev.childrenData || [])];
      updatedErrors[index] = { ...updatedErrors[index], [key]: '' };
      return { ...prev, childrenData: updatedErrors };
    });
  };

  // Function to set number of children dynamically
  const setNumberOfChildren = (count: number) => {
    setFormState((prev) => {
      const newChildren = Array.from(
        { length: count },
        (_, i) => prev.childrenData[i] || { age: null, gender: '' }
      );
      return { ...prev, childrenData: newChildren };
    });

    setErrorState((prev) => {
      const newErrors = Array.from(
        { length: count },
        (_, i) => prev.childrenData?.[i] || { age: '', gender: '' }
      );
      return { ...prev, childrenData: newErrors };
    });
  };

  return {
    formState,
    setFormState,
    errorState,
    setErrorState,
    updateChildrenData,
    setNumberOfChildren,
  };
};
