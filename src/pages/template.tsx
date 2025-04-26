import toast from 'react-hot-toast';
import { useUpserTemplateMutation } from 'src/slices/apis/app.api';
import { getErrorMessage } from 'src/slices/apis/types';
import { filterValues } from 'src/utils';

const TemplatePage = () => {
  const [upsertTemplate, { isLoading: isUpserting }] = useUpserTemplateMutation();

  const handleUpsert = async () => {
    //   if (!validate()) return;

    const payload = {
      description: 'test',
      title: 'test',
      videoLink: 'test',
      xp: 2,
    };

    const filteredFormState: any = filterValues(payload);

    const { data, error } = await upsertTemplate(filteredFormState);

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data.message);
  };

  return (
    <div>
      <button disabled={isUpserting} onClick={handleUpsert}>
        Add
      </button>
    </div>
  );
};

export default TemplatePage;
