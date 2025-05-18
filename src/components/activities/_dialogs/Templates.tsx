import { useEffect, useState, useRef, useReducer } from 'react';
import {
  Button,
  CircularProgress,
  DialogActions,
  Skeleton,
  TextField,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PlayCircleOutline } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { useDebounce } from 'use-debounce';
import { VideoPreviewDialog } from '../../VideoPreview';
import { useFetchTemplatesQuery } from 'src/slices/apis/app.api';
import { cn } from 'src/utils';
import { useActivityAtom } from 'src/store/jotai/activities';

export const TemplatesDialog = ({ open, onClose }: ITemplatesDialog) => {
  const [isVideo, setIsVideo] = useReducer((open) => !open, false);
  const [link, setLink] = useState('');

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [isLast, setIslast] = useState(false);

  const { isFetching, isLoading, data } = useFetchTemplatesQuery(
    { page, pageSize: 10, search: debouncedSearch },
    { skip: !open || isLast }
  );

  const [templates, setTemplates] = useState<ITemplates[]>([]);

  const [template, setTemplate] = useState<ITemplates | null>(null);
  const [templateId, setTemplateId] = useState<number | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data?.resultData?.templates?.length < 10) {
      setIslast(true);
    }
  }, [data?.resultData?.templates?.length]);

  useEffect(() => {
    if (!open) {
      setPage(1);
      setTemplates([]);
      setSearch('');
      setTemplateId(null);
      setIslast(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && data?.resultData?.templates) {
      setTemplates(data.resultData.templates);
    }
  }, [open, data?.resultData?.templates]);

  useEffect(() => {
    setPage(1);
    setTemplates([]);
    setIslast(false);
  }, [debouncedSearch]);

  // Append or replace templates on fetch
  useEffect(() => {
    const fetched = data?.resultData?.templates;
    if (!fetched) return;

    if (page === 1) {
      setTemplates(fetched);
    } else {
      setTemplates((prev) => [...prev, ...fetched]);
    }
  }, [data?.resultData?.templates, page]);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (isLast) return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const { scrollTop, clientHeight, scrollHeight } = drawer;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
        setPage((p) => p + 1);
      }
    };

    drawerRef.current?.addEventListener('scroll', onScroll);
    return () => {
      drawerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, [isFetching]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { className: 'w-[100%] md:w-[50%] !bg-[#f5f6fa]' } }}
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
              className="!sticky !top-0"
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
  const { setFormState } = useActivityAtom();

  const handleReady = () => setLoading(false);

  return (
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
          controls
          width="100%"
          onReady={handleReady}
        />
      </div>

      <Button
        type="button"
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
          variant="contained"
          className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          size="large"
          type="button"
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
  );
};
