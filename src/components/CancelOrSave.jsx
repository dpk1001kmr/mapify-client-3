import React from "react";
import { deleteUpload } from "../api/services/data.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  setData,
  setIsInvalidNumberOfColumnsError,
  setIsMappingError,
  setIsMappingSuccess,
  setIsMissingMandatoryColumnsError,
  setShowCancelOrSave,
} from "../features/upload/uploadSlice";
import { useDispatch } from "react-redux";

const CancelOrSave = () => {
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
    },
    onError: (error) => {},
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      /** save fully matched */
      /** save partially matched */
      await save(requestBody);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["data"]);
      toast.success(data.message);
    },
    onError: (error) => {
      const data = error.response.data;
    },
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
        onClick={(e) => saveMutation.mutate()}
        disabled={saveMutation.isPending}
      >
        {saveMutation.isPending && (
          <span className="loading loading-sm loading-spinner"></span>
        )}
        <span>Save</span>
      </button>
    </div>
  );
};

export default CancelOrSave;
