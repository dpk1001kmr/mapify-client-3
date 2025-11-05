import React from "react";

import {
  setData,
  setIsInvalidNumberOfColumnsError,
  setIsMappingError,
  setIsMappingSuccess,
  setIsMissingMandatoryColumnsError,
  setSavedDataSummary,
  setShowCancelOrSave,
} from "../features/upload/uploadSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUpload, saveMappingSuccess } from "../api/services/data.service";

const SaveMappingSuccess = () => {
  const dispatch = useDispatch();

  const cancelMutation = useMutation({
    mutationFn: deleteUpload,
    onSuccess: (data) => {
      dispatch(setIsMappingSuccess(false));
      dispatch(setIsInvalidNumberOfColumnsError(false));
      dispatch(setIsMissingMandatoryColumnsError(false));
      dispatch(setIsMappingError(false));
      dispatch(setData(null));
      dispatch(setShowCancelOrSave(false));
      dispatch(setSavedDataSummary(null));
    },
    onError: (error) => {},
  });

  const queryClient = useQueryClient();

  const saveMappingSuccessMutation = useMutation({
    mutationFn: saveMappingSuccess,
    onSuccess: (data) => {
      console.log(data);
      dispatch(setIsMappingSuccess(false));
      dispatch(setIsInvalidNumberOfColumnsError(false));
      dispatch(setIsMissingMandatoryColumnsError(false));
      dispatch(setIsMappingError(false));
      dispatch(setData(null));
      dispatch(setShowCancelOrSave(false));
      dispatch(setSavedDataSummary(data));

      queryClient.invalidateQueries(["data"]);
    },
    onError: (error) => {},
  });

  return (
    <div className="flex gap-2 mt-4">
      <button
        className="btn btn-sm"
        onClick={(e) => cancelMutation.mutate()}
        disabled={cancelMutation.isPending}
      >
        {cancelMutation.isPending && (
          <span className="loading loading-sm loading-spinner"></span>
        )}
        <span>Cancel</span>
      </button>
      <button
        className="btn btn-sm"
        onClick={(e) => saveMappingSuccessMutation.mutate()}
        disabled={saveMappingSuccessMutation.isPending}
      >
        {saveMappingSuccessMutation.isPending && (
          <span className="loading loading-sm loading-spinner"></span>
        )}
        <span>Save</span>
      </button>
    </div>
  );
};

export default SaveMappingSuccess;
