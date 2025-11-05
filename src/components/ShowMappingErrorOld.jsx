import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumnNamesMappingFormat,
  setColumnNamesMappingFormatClient,
} from "../features/upload/uploadSlice";

const ShowMappingError = () => {
  const dispatch = useDispatch();

  const { data, columnNamesMappingFormat, columnNamesMappingFormatClient } =
    useSelector((state) => state.upload);
  const { details } = { ...data };

  console.log(columnNamesMappingFormat);
  console.log(columnNamesMappingFormatClient);

  const onChangeHandler = (sheetName, key, value) => {
    dispatch(setColumnNamesMappingFormatClient({ sheetName, key, value }));
  };

  return (
    <div className="mt-4">
      {details.map((sheet, index) => {
        return (
          <div key={index}>
            {sheet.sheetIsFullyMatched && (
              <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
                {sheet.message}
              </p>
            )}
            {!sheet.sheetIsFullyMatched && (
              <>
                {sheet.sheetColumnNames.length === 4 && (
                  <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
                    Only required columns are available in sheet:{" "}
                    {sheet.sheetName}
                  </p>
                )}
                {sheet.sheetColumnNames.length > 4 && (
                  <p className="text-xs border border-red-600 bg-red-100 text-red-600 font-bold px-3 py-2 mb-1">
                    {sheet.message}
                  </p>
                )}
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
                              {!sheet.maskedColumnNames.includes(
                                columnName
                              ) && (
                                <select
                                  className="select select-xs border border-red-600"
                                  defaultValue="Select column"
                                  onChange={(e) =>
                                    onChangeHandler(
                                      sheet.sheetName,
                                      columnName,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option disabled={true}>Select column</option>
                                  {sheet.missingColumnNames.map(
                                    (missingColumnName, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={missingColumnName}
                                        >
                                          {missingColumnName}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ShowMappingError;
