import React from "react";
import { useSelector } from "react-redux";

const ShowSavedDataSummary = () => {
  const {
    isMappingSuccess,
    isInvalidNumberOfColumnsError,
    isMissingMandatoryColumnsError,
    isMappingError,
    showCancelOrSave,
    savedDataSummary,
  } = useSelector((state) => state.upload);

  return (
    <div className="mt-4">
      <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
        <span>Total Records: </span>
        <span>{savedDataSummary.totalRecords}</span>
      </p>
      <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
        <span>Inserted Records Count: </span>
        <span>{savedDataSummary.insertedRecords}</span>
      </p>
      <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
        <span>Skipped Records Count: </span>
        <span>{savedDataSummary.skippedRecords}</span>
      </p>
      <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
        <span>Missing Required Fields: </span>
        <span>{savedDataSummary.skippedReasons.missingRequiredFields}</span>
      </p>
      <p className="text-xs border border-green-600 bg-green-100 text-green-600 font-bold px-3 py-2 mb-1">
        <span>Duplicate Emails: </span>
        <span>{savedDataSummary.skippedReasons.duplicateEmails}</span>
      </p>
    </div>
  );
};

export default ShowSavedDataSummary;
