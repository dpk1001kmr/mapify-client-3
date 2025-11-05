import React from "react";
import { useSelector } from "react-redux";

const ShowInvalidNumberOfColumnsError = () => {
  const data = useSelector((state) => state.upload.data);
  const { details } = { ...data };
  return (
    <div className="mt-4">
      {details.map((sheet, index) => {
        return (
          <p
            key={index}
            className="text-xs border border-red-600 bg-red-100 text-red-600 font-bold px-3 py-2 mb-1"
          >
            {sheet.message}
          </p>
        );
      })}
    </div>
  );
};

export default ShowInvalidNumberOfColumnsError;
