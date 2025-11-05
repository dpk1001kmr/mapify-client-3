import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setData,
  setIsInvalidNumberOfColumnsError,
  setIsMappingError,
  setIsMappingSuccess,
  setIsMissingMandatoryColumnsError,
  setSavedDataSummary,
  setShowCancelOrSave,
} from "../features/upload/uploadSlice";

import {
  deleteUpload,
  saveMappingError,
  saveMappingSuccess,
} from "../api/services/data.service";

const compareMapping = (
  columnNamesMappingFormat,
  columnNamesMappingFormatClient
) => {
  // Defensive defaults
  const serverObj =
    columnNamesMappingFormat && typeof columnNamesMappingFormat === "object"
      ? columnNamesMappingFormat
      : {};
  const clientObj =
    columnNamesMappingFormatClient &&
    typeof columnNamesMappingFormatClient === "object"
      ? columnNamesMappingFormatClient
      : {};

  const serverSheets = Object.keys(serverObj);
  const clientSheets = Object.keys(clientObj);

  // Sheets present in both
  const mappedSheets = serverSheets.filter((sheet) =>
    clientSheets.includes(sheet)
  );

  // Sheets only on one side
  const serverOnlySheets = serverSheets.filter(
    (sheet) => !clientSheets.includes(sheet)
  );
  const clientOnlySheets = clientSheets.filter(
    (sheet) => !serverSheets.includes(sheet)
  );

  const identicalSheets = [];
  const mismappedSheets = [];

  for (const sheet of mappedSheets) {
    const serverColsObj =
      serverObj[sheet] && typeof serverObj[sheet] === "object"
        ? serverObj[sheet]
        : {};
    const clientColsObj =
      clientObj[sheet] && typeof clientObj[sheet] === "object"
        ? clientObj[sheet]
        : {};

    const serverColumns = Object.keys(serverColsObj);
    const clientColumns = Object.keys(clientColsObj);

    const missingColumnInClient = serverColumns.filter(
      (col) => !clientColumns.includes(col)
    );
    const extraColumnInClient = clientColumns.filter(
      (col) => !serverColumns.includes(col)
    );

    if (
      missingColumnInClient.length === 0 &&
      extraColumnInClient.length === 0
    ) {
      identicalSheets.push(sheet);
    } else {
      mismappedSheets.push({
        sheet,
        missingColumnInClient,
        extraColumnInClient,
      });
    }
  }

  return {
    totalServerSheets: serverSheets.length,
    totalClientSheets: clientSheets.length,
    totalMappedSheets: mappedSheets.length,
    mappedSheets,
    identicalSheets,
    mismappedSheets,
    serverOnlySheets,
    clientOnlySheets,
  };
};

const SaveMappingError = () => {
  const { data, columnNamesMappingFormat, columnNamesMappingFormatClient } =
    useSelector((state) => state.upload);

  const { details } = { ...data };

  console.log(columnNamesMappingFormat);
  console.log(columnNamesMappingFormatClient);

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

  const saveMappingErrorMutation = useMutation({
    mutationFn: ({
      matchedSheets,
      mappedSheets,
      columnNamesMappingFormatClient,
    }) => {
      return saveMappingError(
        matchedSheets,
        mappedSheets,
        columnNamesMappingFormatClient
      );
    },
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

      /** Reset local states */
      setMatchedSheets([]);
      setMappedSheets([]);
      setMismappedSheets([]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [matchedSheets, setMatchedSheets] = useState([]);
  const [mappedSheets, setMappedSheets] = useState([]);
  const [mismappedSheets, setMismappedSheets] = useState([]);
  // const [saveAnyway, setSaveAnyway] = useState(false);

  const handleSaveMappingError = () => {
    const matchedSheets = details
      .filter((sheet) => sheet.sheetIsFullyMatched)
      .map((sheet) => sheet.sheetName);
    // setMatchedSheets(cMatchedSheets);

    const {
      totalServerSheets,
      identicalSheets: mappedSheets,
      mismappedSheets,
    } = compareMapping(
      columnNamesMappingFormat,
      columnNamesMappingFormatClient
    );
    // setMappedSheets(cMappedSheets);
    // setMismappedSheets(cMismappedSheets);

    if (mismappedSheets.length > 0) {
      document.getElementById("my_modal_1").showModal();
      setMismappedSheets(mismappedSheets);
      return;
    }

    if (mappedSheets.length === 0 || mappedSheets.length < totalServerSheets) {
      document.getElementById("my_modal_2").showModal();
      setMatchedSheets(matchedSheets);
      setMappedSheets(mappedSheets);
      return;
    }

    saveMappingErrorMutation.mutate({
      matchedSheets,
      mappedSheets,
      columnNamesMappingFormatClient,
    });
  };

  const handleSaveAnyway = () => {
    saveMappingErrorMutation.mutate({
      matchedSheets,
      mappedSheets,
      columnNamesMappingFormatClient,
    });
  };

  return (
    <React.Fragment>
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
          onClick={handleSaveMappingError}
          disabled={saveMappingErrorMutation.isPending}
        >
          {saveMappingErrorMutation.isPending && (
            <span className="loading loading-sm loading-spinner"></span>
          )}
          <span>Save</span>
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {mismappedSheets.length > 0 && (
            <div>
              {mismappedSheets.map((sheet, index) => {
                return (
                  <p
                    key={index}
                    className="text-xs border border-red-600 bg-red-100 text-red-600 font-bold px-3 py-2 mb-1"
                  >
                    {sheet.sheet} is missing column mappings:{" "}
                    {sheet.missingColumnInClient.join(", ")}{" "}
                  </p>
                );
              })}
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          {/* save anyway content goes here */}
          <p>All sheets are not mapped. Do you still want to save the data ?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm me-2"
                onClick={() => setSaveAnyway(false)}
              >
                No
              </button>
              <button className="btn btn-sm" onClick={handleSaveAnyway}>
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </React.Fragment>
  );
};

export default SaveMappingError;
