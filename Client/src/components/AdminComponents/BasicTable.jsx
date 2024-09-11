/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const BasicTable = ({ columns, data, toggleModalHandler }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <div className="">
        <select
          className="border-2 p-2 outline-none m-4 w-54"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        {toggleModalHandler && (
          <button
            className="px-6 rounded py-3 text-lg bg-[#0a2440] border border-[#0a2440] text-white hover:bg-white hover:text-[#0a2440]"
            onClick={toggleModalHandler}
          >
            Send SMS
          </button>
        )}

        <div className="shadow-md rounded-md p-2 w-[99%] overflow-x-scroll">
          <table className="overflow-scroll">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{ asc: "🔼", desc: "🔽" }[header.column.getIsSorted()] ??
                        null}
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

          <div className="flex m-4 p-4 gap-4 items-center">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>

            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded outline-none w-16"
              />
            </span>
          </div>
        </div>

        <div className="w-full flex gap-12 p-4 items-center justify-center">
          <button
            className={
              !table.getCanPreviousPage()
                ? "cursor-not-allowed"
                : "p-2 bg-[#0a2440] rounded-md text-white"
            }
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            First Page
          </button>
          <button
            className={
              !table.getCanPreviousPage()
                ? "cursor-not-allowed"
                : "text-xl p-2 font-bold rounded-md bg-[#0a2440] text-white"
            }
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            &lt;
          </button>
          <button
            className={
              !table.getCanNextPage()
                ? "cursor-not-allowed"
                : "p-2 text-xl font-bold bg-[#0a2440] rounded-md text-white"
            }
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            &gt;
          </button>
          <button
            className={
              !table.getCanNextPage()
                ? "cursor-not-allowed"
                : "p-2 bg-[#0a2440] text-white rounded-md"
            }
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last Page
          </button>
        </div>
      </div>
    </>
  );
};

export default BasicTable;
