import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Pagination from "../Pagination";
import CustomLoader from "../CustomLoader";

const ReusableTable = ({
  columns,
  data,
  isPagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  loading = false,
}) => {
  if (loading) {
    return <CustomLoader />;
  }

  return (
    <>
      {data?.length === 0 ? (
        <div className="w-full mx-auto mt-16 text-center justify-center text-2xl font-bold text-gray-500">
          No Data Found
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
            <table className="w-full table-fixed">
              <colgroup>
                {columns.map((_, index) => (
                  <col key={index} className="w-[calc(100%/var(--col-count))]" />
                ))}
              </colgroup>

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr style={{ "--col-count": columns.length }}>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 text-left text-xs font-semibold text-[#717680] capitalize truncate"
                    >
                      <div className="flex items-center">
                        <span className="truncate">{column.label}</span>
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

              <tbody
                className="bg-white divide-y divide-gray-200"
                style={{ "--col-count": columns.length }}
              >
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 text-sm font-normal text-[#535862] truncate ${
                          column.isCapitalize ? "capitalize" : ""
                        }`}
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
      )}
    </>
  );
};

export default ReusableTable;
