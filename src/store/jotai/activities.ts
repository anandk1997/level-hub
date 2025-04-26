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

export interface IFilterAtom {
  page: number;
  pageSize: number;
  status: 'completed' | 'notCompleted' | 'all';
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

const initialFilter: IFilterAtom = {
  page: 1,
  pageSize: 10,
  status: 'all',
};

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IErrorAtom>>({});

export const filterAtom = atom<IFilterAtom>(initialFilter);

export const useActivityAtom = () => {
  const [formState, setFormState] = useAtom(formAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  const [filters, setFilters] = useAtom(filterAtom);

  const handleChange = (
    key: keyof IFormAtom,
    value: string | string[] | number | boolean | Dayjs | null
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrorState((prev) => ({ ...prev, [key]: '' }));

    if (key === 'isRecurring') {
      setFormState((prev) => ({ ...prev, assignedDays: [], endDate: null }));
      setErrorState((prev) => ({ ...prev, assignedDays: '', endDate: '' }));
    }
  };

  const handleFilters = (key: keyof IFilterAtom, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const newErrors: Partial<IErrorAtom> = {};

    // Common required fields
    const requiredFields: [keyof IFormAtom, string][] = [
      ['title', 'Name is required'],
      ['xp', 'XP is required'],
      ['startDate', 'Please select start date'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ If isRecurring is true, validate assignedDays
    if (formState.isRecurring && (!formState.assignedDays || formState.assignedDays.length === 0)) {
      newErrors.assignedDays = 'Please select at least one day for recurrence';
      newErrors.endDate = 'Please select end date';
    }

    // ✅ Validate video link (if provided)
    const videoLink = formState.videoLink?.trim();

    if (videoLink) {
      const isValidYoutube =
        /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/i.test(videoLink);
      const isValidVimeo = /^https?:\/\/(www\.)?vimeo\.com\/\d+$/i.test(videoLink);

      if (!isValidYoutube && !isValidVimeo) {
        newErrors.videoLink = 'Only valid YouTube or Vimeo links are allowed';
      }
    }

    // Set error state
    setErrorState((prev) => ({ ...prev, ...newErrors }));

    const hasErrors = Object.values({ ...errorState, ...newErrors }).some((val) => !!val);

    return !hasErrors;
  };

  return {
    formState,
    setFormState,
    errorState,
    setErrorState,

    handleChange,
    validate,

    filters,
    handleFilters,
  };
};
