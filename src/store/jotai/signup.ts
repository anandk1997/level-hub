import { atom, useAtom } from 'jotai';
import { Dayjs } from 'dayjs';

export type OptionType = { label: string; value: string };

export type RoleType =
  | ''
  | 'ADMIN'
  | 'GYM.OWNER'
  | 'COACH.OWNER'
  | 'COACH.HEAD'
  | 'COACH'
  | 'PARENT.OWNER'
  | 'PARENT'
  | 'CHILD'
  | 'INDIVIDUAL.OWNER'
  | 'INDIVIDUAL';

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

  const updateChildrenData = (index: number, key: keyof ChildType, value: any) => {
    setFormState((prev) => {
      const updatedChildren = [...prev.childrenData];
      updatedChildren[index] = { ...updatedChildren[index], [key]: value };
      return { ...prev, childrenData: updatedChildren };
    });

    setErrorState((prev) => {
      const updatedErrors = [...(prev.childrenData || [])];
      updatedErrors[index] = { ...updatedErrors[index], [key]: '' };
      return { ...prev, childrenData: updatedErrors };
    });
  };

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

  const handleChange = (key: keyof IFormAtom, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    if (key === 'role') {
      setErrorState((prev) => ({
        ...prev,
        gymName: '',
        dob: '',
        month: '',
        day: '',
        year: '',
        gender: '',
        childrens: '',
        childrenData: [],
      }));
    }

    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string | Record<string, string>[] | undefined> = {};

    const requiredFields: [keyof IFormAtom, string][] = [
      ['firstName', 'First name is required'],
      ['lastName', 'Last name is required'],
      ['password', 'Password is required'],
      ['confirmPassword', 'Confirm password is required'],
      ['role', 'Role is required'],
      ['agreeToTerms', 'You must agree to the terms'],
    ];

    const roleSpecificFields: Partial<Record<RoleType, [keyof IFormAtom, string][]>> = {
      'GYM.OWNER': [['gymName', 'Gym Name is required']],
      PARENT: [['childrens', 'Please specify no. of childrens']],
      'PARENT.OWNER': [['childrens', 'Please specify no. of childrens']],
    };

    if (formState.role && formState.role in roleSpecificFields) {
      requiredFields.push(...(roleSpecificFields[formState.role as RoleType] ?? []));
    }

    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    const email = formState.email?.trim();
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (
      formState.password &&
      formState.confirmPassword &&
      formState.password !== formState.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Uncomment to enable phone validation
    // const phone = formState.phone?.trim();
    // if (!phone || phone.length <= 3) newErrors.phone = 'Phone number is required';
    // else if (!/^\+\d{4,}$/.test(phone)) newErrors.phone = 'Invalid phone number';

    if (formState.role === 'PARENT' || formState.role === 'PARENT.OWNER') {
      const childErrors: Record<string, string>[] = [];

      formState.childrenData.forEach((child, index) => {
        const childError: Record<string, string> = {};
        if (!child.age) childError.age = `Child ${index + 1} age is required`;
        if (!child.gender) childError.gender = `Child ${index + 1} gender is required`;
        childErrors.push(childError);
      });

      if (childErrors.some((child) => Object.keys(child).length > 0)) {
        newErrors.childrenData = childErrors;
      }
    }

    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formState,
    setFormState,
    errorState,

    updateChildrenData,
    setNumberOfChildren,

    handleChange,
    validate,
  };
};
