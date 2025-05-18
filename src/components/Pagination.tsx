import { TablePagination } from '@mui/material';

export const Pagination = ({
  totalCount,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: ITablePaginationProps) => {
  // const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={currentPage - 1}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 25, 50]}
      sx={{
        '.MuiTablePagination-toolbar': {
          justifyContent: 'flex-end',
        },
        '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
          color: 'gray',
        },
        '.MuiSelect-icon': {
          color: 'gray',
        },
      }}
    />
  );
};

interface ITablePaginationProps {
  totalCount: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (e: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
