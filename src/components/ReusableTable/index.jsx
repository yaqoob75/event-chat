import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Pagination from "../Pagination";

// const ReusableTable = ({
//   columns,
//   data,
//   isPagination = true,
//   currentPage = 1,
//   totalPages = 1,
//   onPageChange,
// }) => {
//   return (
//     <>
//       <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               {columns.map((column) => (
//                 <th
//                   key={column.key}
//                   className={`px-6 py-3 text-left text-xs font-semibold text-[#717680] capitalize`}
//                 >
//                   <div className="flex items-center">
//                     <span>{column.label}</span>
//                     {column.sortable && (
//                       <div className="flex flex-col ml-1.5">
//                         <FaChevronUp className="w-2 h-2 text-gray-400" />
//                         <FaChevronDown className="w-2 h-2 text-gray-400 -mt-0.5" />
//                       </div>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((row, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 {columns.map((column) => (
//                   <td
//                     key={column.key}
//                     className="px-6 py-4 text-sm font-normal text-[#535862] whitespace-nowrap"
//                   >
//                     {column.render
//                       ? column.render(row[column.key], row)
//                       : row[column.key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isPagination && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={onPageChange}
//         />
//       )}
//     </>
//   );
// };

// export default ReusableTable;


const ReusableTable = ({
  columns,
  data,
  isPagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
}) => {
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-[#717680] capitalize"
                >
                  <div className="flex items-center">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col ml-1.5">
                        <FaChevronUp className="w-2 h-2 text-gray-400" />
                        <FaChevronDown className="w-2 h-2 text-gray-400 -mt-0.5" />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 cursor-pointer`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm font-normal text-[#535862] whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default ReusableTable;
