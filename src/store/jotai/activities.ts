import { Dayjs } from 'dayjs';
import { atom, useAtom } from 'jotai';

interface IErrorAtom {
  activityId: string;
  title: string;
  xp: string;
  description: string;
  videoLink: string;
  isRecurring: string;
  startDate: string;
  endDate: string;
  assignedDays: string;
  isSelfAssignment: string;
}

interface IFormAtom {
  activityId?: string;
  title: string;
  xp: number;
  description: string;
  videoLink: string;
  isRecurring: boolean;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  assignedDays: string[];
  isSelfAssignment: boolean;
}

export const initialFormState: IFormAtom = {
  title: '',
  xp: 0,
  description: '',
  videoLink: '',
  isRecurring: false,
  startDate: null,
  endDate: null,
  assignedDays: [],
  isSelfAssignment: false,
};

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IErrorAtom>>({});

export const useActivityAtom = () => {
  const [formState, setFormState] = useAtom(formAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  const handleChange = (
    key: keyof IFormAtom,
    value: string | string[] | number | boolean | Dayjs | null
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrorState((prev) => ({ ...prev, [key]: '' }));

    if (key === 'isRecurring') {
      setFormState((prev) => ({ ...prev, assignedDays: [] }));
      setErrorState((prev) => ({ ...prev, assignedDays: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<IErrorAtom> = {};

    // Common required fields
    const requiredFields: [keyof IFormAtom, string][] = [
      ['title', 'Name is required'],
      ['xp', 'XP is required'],
      ['startDate', 'Please select start date'],
      ['endDate', 'Please select end date'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ If isRecurring is true, validate assignedDays
    if (formState.isRecurring && (!formState.assignedDays || formState.assignedDays.length === 0)) {
      newErrors.assignedDays = 'Please select at least one day for recurrence';
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
