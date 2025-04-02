import { Dayjs } from 'dayjs';
import { atom, useAtom } from 'jotai';

interface IErrorAtom {
  name: string;
  xp: string;
  description: string;
  videoLink: string;
  recurring: string;
  selectedDate: string;
  selectedDays: string;
}

interface IFormAtom {
  name: string;
  xp: string;
  description: string;
  videoLink: string;
  recurring: boolean;
  selectedDate: Dayjs | null;
  selectedDays: string[];
}

const initialFormState: IFormAtom = {
  name: '',
  xp: '',
  description: '',
  videoLink: '',
  recurring: false,
  selectedDate: null,
  selectedDays: [],
};

interface IError {
  name: string;
  xp: string;
  description: string;
  videoLink: string;
  recurring: string;
  selectedDate: string;
  selectedDays: string;
}

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IErrorAtom>>({});

export const useActivityAtom = () => {
  const [formState, setFormState] = useAtom(formAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  const handleChange = (
    key: keyof IFormAtom,
    value: string | string[] | boolean | Dayjs | null
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrorState((prev) => ({ ...prev, [key]: '' }));

    if (key === 'recurring') {
      setFormState((prev) => ({ ...prev, selectedDays: [] }));
      setErrorState((prev) => ({ ...prev, selectedDays: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<IError> = {};

    // Common required fields
    const requiredFields: [keyof IFormAtom, string][] = [
      ['name', 'Name is required'],
      ['xp', 'XP is required'],
      ['selectedDate', 'Please select start date'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ If recurring is true, validate selectedDays
    if (formState.recurring && (!formState.selectedDays || formState.selectedDays.length === 0)) {
      newErrors.selectedDays = 'Please select at least one day for recurrence';
    }

    // ✅ Set error state
    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formState,
    setFormState,
    errorState,
    setErrorState,

    handleChange,
    validate,
  };
};
