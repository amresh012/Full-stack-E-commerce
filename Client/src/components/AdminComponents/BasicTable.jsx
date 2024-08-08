import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import Mdata from "../../MOCK_DATA (3).json";
import { TablePagination } from "@mui/material";
import {FaArrowUp , FaArrowDown} from "react-icons/fa"
const BasicTable = ({columns, data}) => {
  const [sorting, setSorting] = useState([]);

  // const data1 = useMemo(() => data, []);
  const table = useReactTable({
    data : data ,
    columns : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(20),
    getSortedRowModel: getSortedRowModel(),
    sorting: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });
  return (
    <div className="border-2 shadow-md  bg-transparent">
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        slotProps={{
          select: {
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          },
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => {
          const size = e.target.value ? Number(e.target.value) : 10
          table.setPageSize(size)
        }}
        ActionsComponent={TablePaginationActions}
      /> */}

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {asc:"dec" , des :"inc"}[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-x-4 p-4 m-4 border-2 w-fit ">showing {table.getPageCount()} entries {table.getRowCount()}</div>
      <div className="w-full flex gap-12 p-4  items-center justify-center">
        <button
          className={
            !table.getCanPreviousPage()
              ? "cursor-not-allowed    "
              : "p-2 bg-gray-200 "
          }
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          &lt;&lt;
        </button>
        <button
          className={
            !table.getCanPreviousPage()
              ? "cursor-not-allowed    "
              : "p-2  text-xl font-bold bg-gray-200 "
          }
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          &lt;
        </button>
        <button
          className={
            !table.getCanNextPage()
              ? "cursor-not-allowed "
              : "p-2 text-xl font-bold bg-gray-200 "
          }
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          &gt;
        </button>
        <button
          className={
            !table.getCanNextPage()
              ? "cursor-not-allowed "
              : "p-2 bg-gray-200 "
          }
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
