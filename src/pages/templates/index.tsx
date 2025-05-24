import { DeleteForeverOutlined, PlayCircleOutline } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { TemplateDialog } from 'src/components/templates/dialogs/TemplateDialog';
import { initialFormState, useTemplateAtom } from 'src/store/jotai/templates';
import { cn } from 'src/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useDeleteTemplateMutation, useFetchTemplatesQuery } from 'src/slices/apis/app.api';
import { LineProgress } from 'src/components/lineProgress';
import { Pagination } from 'src/components/Pagination';
import { VideoPreviewDialog } from 'src/components/VideoPreview';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { ConfirmationDialog } from 'src/components/ConfirmationDialog';

const TemplatePage = () => {
  const [isTemplate, setIsTemplate] = useReducer((prev) => !prev, false);
  const [isDelete, setIsDelete] = useReducer((prev) => !prev, false);

  const { setFormState, setErrorState, filters, handleFilters } = useTemplateAtom();

  const { data, isFetching } = useFetchTemplatesQuery({ ...filters });
  const [deleteTemplate, { isLoading: isDeleting }] = useDeleteTemplateMutation();

  const [video, setVideo] = useState('');
  const [id, setId] = useState('');

  const [isVideo, setIsVideo] = useReducer((open) => !open, false);

  useEffect(() => {
    if (!isTemplate) {
      setFormState(initialFormState);
      setErrorState({});
    }
  }, [isTemplate]);

  const totalCount = data?.resultData?.count || 0;

  const onUpdate = (activity: ITemplate) => {
    setFormState({
      templateId: activity?.id?.toString(),
      description: activity?.description,
      title: activity?.title,
      videoLink: activity?.videoLink,
      xp: activity?.xp,
    });

    setIsTemplate();
  };

  const onDelete = async () => {
    const { data, error } = await deleteTemplate({ params: { id } });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data?.message);
    setIsDelete();
  };

  if (isFetching) return <LineProgress />;
  return (
    <>
      <TemplateDialog open={isTemplate} onClose={setIsTemplate} />
      <VideoPreviewDialog open={isVideo} setOpen={setIsVideo} link={video} />

      <ConfirmationDialog
        title="Are you sure you want to delete this template"
        message="This action will permanently delete the selected template and can not be undone"
        onOpen={isDelete}
        onClose={setIsDelete}
        isLoading={isDeleting}
        onSubmit={onDelete}
      />

      <div className="">
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h4">Activity Templates</Typography>

          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
            onClick={setIsTemplate}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Add New Template
          </Button>
        </div>
      </div>

      <div className="">
        {data?.resultData?.templates?.map((template: ITemplate) => (
          <Card key={template.id} sx={{ marginBottom: 2, width: '100%' }}>
            <CardActionArea
              sx={{
                cursor: 'default',
                height: '100%',
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
                },
              }}
              onClick={() => {
                // router.push(`${route.activities}/${template.id}`);
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  overflow: 'hidden',
                }}
              >
                {/* Content Row */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      flex: 1,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {template.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      flex: 2,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {template.description}
                  </Typography>

                  <IconButton
                    component="div"
                    disabled={!template.videoLink}
                    className={cn(
                      '!bg-[#09C0F0] !rounded-full !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !flex gap-0.5 !justify-center !items-center disabled:!cursor-default disabled:!text-white disabled:!bg-gray-300 !text-sm !px-2 !text-white',
                      {
                        '!text-white !bg-gray-400': !template.videoLink,
                      }
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideo();
                      setVideo(template.videoLink);
                    }}
                  >
                    <PlayCircleOutline sx={{ fontSize: 20 }} />
                    Preview
                  </IconButton>

                  {/* XP */}
                  <Typography
                    sx={{ flex: 1, whiteSpace: 'nowrap', color: 'green', textAlign: 'center' }}
                  >
                    {template.xp} XP
                  </Typography>

                  {/* Action Button */}
                  <IconButton
                    className={cn(
                      'group !border !border-transparent !text-white hover:!bg-white !flex !rounded-full',
                      '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]'
                    )}
                    component="div"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(template);
                    }}
                  >
                    <EditSquareIcon className="!text-sm" />
                  </IconButton>

                  <IconButton
                    className={cn(
                      'group !border !border-transparent !text-white hover:!bg-white !flex !rounded-full !p-0.5',
                      '!bg-red-500 hover:!border-[red] hover:!text-[red]'
                    )}
                    component="div"
                    onClick={(e) => {
                      e.stopPropagation();
                      setId(template?.id?.toString());
                      setIsDelete();
                    }}
                  >
                    <DeleteForeverOutlined fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        <Pagination
          totalCount={totalCount}
          currentPage={filters.page}
          rowsPerPage={filters.pageSize}
          onPageChange={(_e, newPage) => handleFilters('page', newPage + 1)}
          onRowsPerPageChange={(e) => {
            handleFilters('pageSize', parseInt(e.target.value, 10));
            handleFilters('page', 1);
          }}
        />
      </div>
    </>
  );
};

export default TemplatePage;

interface ITemplate {
  id: number;
  title: string;
  description: string;
  videoLink: string;
  xp: number;
  userId: number;
}
