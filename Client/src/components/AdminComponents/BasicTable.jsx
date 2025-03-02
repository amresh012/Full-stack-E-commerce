// /* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaExclamationCircle } from "react-icons/fa";
import Loader from "../../components/reusablesUI/Loader"; // Assuming you have a Loader component

const BasicTable = ({ columns, data, toggleModalHandler }) => {
  const [sorting, setSorting] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data loading (remove this useEffect if you already manage loading state)
  useEffect(() => {
    if (!data && data.length ===0) {
      setIsLoading(true);
    } else {
      setTimeout(()=>{
        setIsLoading(false);
      },2000)
    }
  }, [data]);

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
      {isLoading ? (
        // Show loader while data is being fetched
        <div className=" w-full flex flex-col items-center justify-center">
          <Loader /> {/* Replace this with your loader component */}
          <p className="mt-2 text-2xl font-bold text-gray-500">Loading...</p>
        </div>
      ) : data.length === 0 ? (
        // Show "No Records Found" when data is empty
        <div className=" gap-2 m-2  min-h-[50vh]  flex flex-col items-center justify-center  mt-4 text-2xl font-bold">
          <span className="text-orange-500  animate-bounce">
            <FaExclamationCircle size={50} />
          </span>
          <p>No Records Found</p>
        </div>
      ) : (
        <div>
          {/* {toggleModalHandler && (
            <button
              className="p-3 rounded bg-[#0a2440] border border-[#0a2440] text-white hover:bg-white hover:text-[#0a2440]"
              onClick={toggleModalHandler}
            >
              Send SMS
            </button>
          )} */}

          <div className=" p-2  overflow-x-scroll no-scrollbar">
            <table className="rounded-lg">
              <thead  className="">
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
                        {{ asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted()
                        ] ?? null}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
              {/*  */}
              <select
            className="border rounded-lg p-2 outline-none m-4 w-54"
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
              className="p-2 rounded bg-[#0a2440] border border-[#0a2440] text-white hover:bg-white hover:text-[#0a2440]"
              onClick={toggleModalHandler}
            >
              Send SMS
            </button>
          )}
            </div>
          </div>

          <div className="w-full flex gap-12 p-4 items-center justify-center">
            <button
              className={
                !table.getCanPreviousPage()
                  ? "cursor-not-allowed bg-gray-100 p-2 rounded-md"
                  : " bg-gray-200 p-2 rounded-md"
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
                  ? "cursor-not-allowed bg-gray-100 p-2 rounded-md"
                  : "bg-gray-200 p-2 rounded-md"
              }
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Last Page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicTable;















// import React, { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   getPaginationRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";
// import { FaExclamationCircle } from "react-icons/fa";

// const BasicTable = ({ columns, data, toggleModalHandler }) => {
//   const [sorting, setSorting] = useState([]);

//   const table = useReactTable({
//     data: data,
//     columns: columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       sorting: sorting,
//     },
//     onSortingChange: setSorting,
//   });

//   return (
//     <>
//     {
//       data.length === 0 ? 
//       <div className="h-[50vh] gap-2 w-full flex flex-col items-center justify-center bg-gray-100 mt-4 text-2xl font-bold">
//         <span className="text-orange-400"><FaExclamationCircle size={50}/></span>
//         <p>No Records Found</p>
//       </div>
//       :
//       <div className="">
//         <select
//           className="border-2 p-2 outline-none m-4 w-54"
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>

//         {toggleModalHandler && (
//           <button
//             className="px-6 rounded py-3 text-lg bg-[#0a2440] border border-[#0a2440] text-white hover:bg-white hover:text-[#0a2440]"
//             onClick={toggleModalHandler}
//           >
//             Send SMS
//           </button>
//         )}

//         <div className="shadow-md rounded-md p-2 w-[99%] overflow-x-scroll">
//           <table className="overflow-scroll">
//             <thead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className={
//                         header.column.getCanSort()
//                           ? "cursor-pointer select-none"
//                           : ""
//                       }
//                       onClick={header.column.getToggleSortingHandler()}
//                       title={
//                         header.column.getCanSort()
//                           ? header.column.getNextSortingOrder() === "asc"
//                             ? "Sort ascending"
//                             : header.column.getNextSortingOrder() === "desc"
//                             ? "Sort descending"
//                             : "Clear sort"
//                           : undefined
//                       }
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {{ asc: "🔼", desc: "🔽" }[header.column.getIsSorted()] ??
//                         null}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex m-4 p-4 gap-4 items-center">
//             <span className="flex items-center gap-1">
//               <div>Page</div>
//               <strong>
//                 {table.getState().pagination.pageIndex + 1} of{" "}
//                 {table.getPageCount()}
//               </strong>
//             </span>

//             <span className="flex items-center gap-1">
//               | Go to page:
//               <input
//                 type="number"
//                 defaultValue={table.getState().pagination.pageIndex + 1}
//                 onChange={(e) => {
//                   const page = e.target.value ? Number(e.target.value) - 1 : 0;
//                   table.setPageIndex(page);
//                 }}
//                 className="border p-1 rounded outline-none w-16"
//               />
//             </span>
//           </div>
//         </div>

//         <div className="w-full flex gap-12 p-4 items-center justify-center">
//           <button
//             className={
//               !table.getCanPreviousPage()
//                 ? "cursor-not-allowed"
//                 : "p-2 bg-[#0a2440] rounded-md text-white"
//             }
//             disabled={!table.getCanPreviousPage()}
//             onClick={() => table.setPageIndex(0)}
//           >
//             First Page
//           </button>
//           <button
//             className={
//               !table.getCanPreviousPage()
//                 ? "cursor-not-allowed"
//                 : "text-xl p-2 font-bold rounded-md bg-[#0a2440] text-white"
//             }
//             disabled={!table.getCanPreviousPage()}
//             onClick={() => table.previousPage()}
//           >
//             &lt;
//           </button>
//           <button
//             className={
//               !table.getCanNextPage()
//                 ? "cursor-not-allowed"
//                 : "p-2 text-xl font-bold bg-[#0a2440] rounded-md text-white"
//             }
//             disabled={!table.getCanNextPage()}
//             onClick={() => table.nextPage()}
//           >
//             &gt;
//           </button>
//           <button
//             className={
//               !table.getCanNextPage()
//                 ? "cursor-not-allowed"
//                 : "p-2 bg-[#0a2440] text-white rounded-md"
//             }
//             disabled={!table.getCanNextPage()}
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           >
//             Last Page
//           </button>
//         </div>
//       </div>
//     }
//           </>
//   );
// };

// export default BasicTable;
