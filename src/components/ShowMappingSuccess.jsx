import React from "react";
import { useSelector } from "react-redux";

const ShowMappingSuccess = () => {
  const data = useSelector((state) => state.upload.data);
  const { details } = { ...data };
  return (
    <div className="mt-4">
      {details.map((sheet, index) => {
        return (
          <>
            <p
              key={index}
              className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1"
            >
              {sheet.message}
            </p>
            <div className="overflow-x-auto mb-1">
              <table className="table table-xs">
                <tbody>
                  {sheet.sheetColumnNames.map((columnName, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className={`${
                            sheet.maskedColumnNames.includes(columnName)
                              ? "border border-green-600 bg-green-100"
                              : "border border-red-600 bg-red-100"
                          }`}
                        >
                          {columnName}
                        </td>
                        <td
                          className={`${
                            sheet.maskedColumnNames.includes(columnName)
                              ? "border border-green-600 bg-green-100"
                              : "border border-red-600 bg-red-100"
                          }`}
                        >
                          {sheet.maskedColumnNames.includes(columnName) &&
                            columnName}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ShowMappingSuccess;
