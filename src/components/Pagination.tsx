import { Pagination as MuiPagination } from '@mui/material';
import { ChangeEvent } from 'react';

export const Pagination = ({ totalPages, currentPage, onPageChange }: IPagination) => {
  return (
    totalPages > 1 && (
      <MuiPagination
        className="flex justify-end"
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        sx={{
          '.MuiPaginationItem-root': {
            color: 'gray',

            '&:hover': {
              border: '1px solid #09C0F0',
              color: '#09C0F0',
              backgroundColor: 'transparent',
            },
          },

          '.Mui-selected': {
            backgroundColor: '#09C0F0 !important',
            color: 'white',
            border: '1px solid #09C0F0 !important',
            '&:hover': {
              color: '#09C0F0 !important',
              backgroundColor: 'transparent !important',
            },
          },
        }}
      />
    )
  );
};

interface IPagination {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
}
