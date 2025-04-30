import { Dayjs } from 'dayjs';
import { atom, useAtom } from 'jotai';

interface IErrorAtom {
  templateId: string;
  title: string;
  xp: string;
  description: string;
  videoLink: string;
}

interface IFormAtom {
  templateId?: string;
  title: string;
  xp: number;
  description: string;
  videoLink: string;
}

export interface IFilterAtom {
  search: string;
  page: number;
  pageSize: number;
}

export const initialFormState: IFormAtom = {
  title: '',
  xp: 0,
  description: '',
  videoLink: '',
};

const initialFilter: IFilterAtom = {
  search: '',
  page: 1,
  pageSize: 10,
};

export const formAtom = atom<IFormAtom>(initialFormState);
export const errorAtom = atom<Partial<IErrorAtom>>({});

export const filterAtom = atom<IFilterAtom>(initialFilter);

export const useTemplateAtom = () => {
  const [formState, setFormState] = useAtom(formAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  const [filters, setFilters] = useAtom(filterAtom);

  const handleChange = (
    key: keyof IFormAtom,
    value: string | string[] | number | boolean | Dayjs | null
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrorState((prev) => ({ ...prev, [key]: '' }));
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
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

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
