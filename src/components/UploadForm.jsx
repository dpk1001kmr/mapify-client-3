import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { upload } from "../api/services/data.service";
import { useDispatch } from "react-redux";

import {
  setData,
  setIsInvalidNumberOfColumnsError,
  setIsMappingError,
  setIsMappingSuccess,
  setIsMissingMandatoryColumnsError,
  setShowCancelOrSave,
  setSavedDataSummary,
  setColumnNamesMappingFormat,
} from "../features/upload/uploadSlice";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    uploadMutation.mutate(file);
  };

  const dispatch = useDispatch();

  const uploadMutation = useMutation({
    mutationFn: upload,

    /** Handle success response after calling api */
    onSuccess: (data) => {
      console.log(data);
      if (data.type === "MappingSuccess") {
        dispatch(setIsMappingSuccess(true));
        dispatch(setIsInvalidNumberOfColumnsError(false));
        dispatch(setIsMissingMandatoryColumnsError(false));
        dispatch(setIsMappingError(false));
        dispatch(setData(data));
        dispatch(setShowCancelOrSave(true));
        dispatch(setSavedDataSummary(null));
      }
    },

    /** Handle error response after calling api */
    onError: (error) => {
      const data = error.response.data;
      console.log(data);
      if (data.type === "InvalidNumberOfColumnsError") {
        dispatch(setIsMappingSuccess(false));
        dispatch(setIsInvalidNumberOfColumnsError(true));
        dispatch(setIsMissingMandatoryColumnsError(false));
        dispatch(setIsMappingError(false));
        dispatch(setData(data));
        dispatch(setShowCancelOrSave(false));
        dispatch(setSavedDataSummary(null));
      }
      if (data.type === "MissingMandatoryColumnsError") {
        dispatch(setIsMappingSuccess(false));
        dispatch(setIsInvalidNumberOfColumnsError(false));
        dispatch(setIsMissingMandatoryColumnsError(true));
        dispatch(setIsMappingError(false));
        dispatch(setData(data));
        dispatch(setShowCancelOrSave(false));
        dispatch(setSavedDataSummary(null));
      }
      if (data.type === "MappingError") {
        dispatch(setIsMappingSuccess(false));
        dispatch(setIsInvalidNumberOfColumnsError(false));
        dispatch(setIsMissingMandatoryColumnsError(false));
        dispatch(setIsMappingError(true));
        dispatch(setData(data));
        dispatch(setShowCancelOrSave(true));
        dispatch(setSavedDataSummary(null));
        dispatch(setColumnNamesMappingFormat(data.columnNamesMappingFormat));
      }
    },
  });

  return (
    <React.Fragment>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Upload file</legend>
        <div className="flex gap-2">
          <input
            type="file"
            className="file-input file-input-sm"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-sm"
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending && (
              <span className="loading loading-sm loading-spinner"></span>
            )}
            <span>Upload</span>
          </button>
        </div>
        <p className="label">Only xlsx or csv file is allowed</p>
      </fieldset>
    </React.Fragment>
  );
};

export default UploadForm;
