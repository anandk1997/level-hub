import {
  Button,
  CircularProgress,
  DialogActions,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useReducer, useState, useRef } from 'react';
import { VideoPreviewDialog } from './VideoPreview';
import { useFetchTemplatesQuery } from 'src/slices/apis/app.api';
import { PlayCircleOutline } from '@mui/icons-material';
import debounce from 'lodash.debounce'; // using lodash.debounce
import ReactPlayer from 'react-player';
import { cn } from 'src/utils';
import { useActivityAtom } from 'src/store/jotai/activities';

export const TemplatesDialog = ({ open, onClose }: ITemplatesDialog) => {
  const [isVideo, setIsVideo] = useReducer((open) => !open, false);
  const [link, setLink] = useState('');

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  const { isFetching, isLoading, data } = useFetchTemplatesQuery(
    { page, pageSize: 10, search: debouncedSearch },
    { skip: !open }
  );

  const [templates, setTemplates] = useState<ITemplates[]>([]);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const [template, setTemplate] = useState<ITemplates | null>(null);
  const [templateId, setTemplateId] = useState<number | null>(null);

  useEffect(() => {
    if (!open) {
      setTemplateId(null);
    }
  }, [open]);

  // Debounced function to update debouncedSearch
  const debounceSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setPage(1);
      setTemplates([]);
    }, 300)
  ).current;

  useEffect(() => {
    if (open) {
      debounceSearch(search);
    }
  }, [search, open, debounceSearch]);

  useEffect(() => {
    return () => {
      debounceSearch.cancel(); // cancel debounce on unmount
    };
  }, [debounceSearch]);

  useEffect(() => {
    if (data?.resultData?.templates) {
      if (page === 1) {
        setTemplates(data.resultData.templates);
      } else {
        setTemplates((prev) => [...prev, ...data.resultData.templates]);
      }
    }
  }, [data, page, isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      if (!drawerRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = drawerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
        setPage((prev) => prev + 1);
      }
    };

    const drawer = drawerRef.current;
    drawer?.addEventListener('scroll', handleScroll);

    return () => {
      drawer?.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    if (!open) {
      setPage(1);
      setTemplates([]);
      setSearch('');
      setDebouncedSearch('');
    }
  }, [open]);

  return (
    <Drawer
      anchor="right"
      slotProps={{ paper: { className: 'w-[100%] md:w-[50%] !bg-[#f5f6fa]' } }}
      open={open}
      onClose={onClose}
    >
      <VideoPreviewDialog open={isVideo} setOpen={setIsVideo} link={link} />

      <header className="border-b border-gray-300 relative">
        <Typography className="p-2">Activity Templates</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
            borderRadius: 10,
            border: '1px solid',
            padding: 0,
          })}
        >
          <CloseIcon />
        </IconButton>
      </header>

      {templateId ? (
        <Template data={template} onClose={() => setTemplateId(null)} onApply={onClose} />
      ) : (
        <div ref={drawerRef} className="overflow-y-auto h-[calc(100vh-60px)] p-2">
          <form noValidate className="mb-4" onSubmit={(e) => e.preventDefault()}>
            <TextField
              fullWidth
              name="search"
              label="Search Templates"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {templates?.map((item) => (
            <Button
              key={item?.id}
              component="div"
              className="!flex !justify-between !p-2 !bg-white !my-2"
              onClick={(e) => {
                e.stopPropagation();
                setTemplate(item);
                setTemplateId(item?.id);
              }}
            >
              <span className="text-black">{item.title}</span>
              <span className="text-[#09C0F0]">{item.xp} XP</span>

              <Button
                type="button"
                color="inherit"
                variant="contained"
                className="!bg-[#09C0F0] !rounded-full !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !flex gap-0.5 !justify-center !items-center disabled:!cursor-default disabled:!text-white disabled:!bg-gray-300"
                disabled={!item.videoLink}
                onClick={(e) => {
                  e.stopPropagation();
                  setLink(item.videoLink);
                  setIsVideo();
                }}
              >
                <PlayCircleOutline />
                Preview
              </Button>
            </Button>
          ))}

          {!isFetching && !!!templates?.length && (
            <Typography className="text-center">No Templates Found</Typography>
          )}

          {isFetching && (
            <CircularProgress className="!text-[#09C0F0] !flex !m-auto" sx={{ scale: '.8' }} />
          )}

          {isLoading && (
            <>
              <Skeleton variant="rectangular" height={60} className="mt-2 rounded-xl" />
              <Skeleton variant="rectangular" height={60} className="mt-2 rounded-xl" />
              <Skeleton variant="rectangular" height={60} className="mt-2 mb-2 rounded-xl" />
            </>
          )}
        </div>
      )}
    </Drawer>
  );
};

interface ITemplatesDialog {
  open: boolean;
  onClose: () => void;
}

interface ITemplates {
  id: number;
  title: string;
  description: string;
  videoLink: string;
  xp: number;
  userId: number;
}

const Template = ({
  data,
  onClose,
  onApply,
}: {
  data: ITemplates | null;
  onClose: () => void;
  onApply: () => void;
}) => {
  const [loading, setLoading] = useState(true);

  const handleReady = () => setLoading(false);

  const { setFormState } = useActivityAtom();

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">{data?.title}</span>
          <span className="text-lg font-bold text-[#09C0F0]">{data?.xp} XP</span>
        </div>

        <p className="mt-2 text-gray-500">{data?.description}</p>

        {loading && (
          <div className="flex justify-center items-center h-[360px] m-auto">
            <CircularProgress
              className="!text-[#09C0F0] group-hover:!text-[#09C0F0]"
              sx={{ scale: '1.5' }}
            />
          </div>
        )}

        <div className={cn('my-2', { 'h-0 opacity-0': loading })}>
          <ReactPlayer
            url={data?.videoLink}
            playing={false}
            controls={true}
            width="100%"
            onReady={handleReady}
          />
        </div>

        <Button
          type="button"
          color="inherit"
          variant="contained"
          className="!bg-[#09C0F0] !rounded-full !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !flex gap-0.5 !justify-center !items-center disabled:!cursor-default disabled:!text-white disabled:!bg-gray-300"
          disabled={!data?.videoLink}
        >
          <PlayCircleOutline />
          Preview
        </Button>

        <DialogActions className="flex justify-center mt-2">
          <Button
            size="large"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            onClick={() => {
              setFormState((prev) => ({
                ...prev,
                description: data?.description!,
                title: data?.title!,
                videoLink: data?.videoLink!,
                xp: data?.xp!,
              }));

              onClose();
              onApply();
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </div>
    </>
  );
};
