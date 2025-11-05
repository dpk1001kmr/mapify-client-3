import React from "react";
import UploadForm from "../components/UploadForm";
import { useSelector } from "react-redux";
import ShowMappingSuccess from "../components/ShowMappingSuccess";
import ShowInvalidNumberOfColumnsError from "../components/ShowInvalidNumberOfColumnsError";
import ShowMissingMandatoryColumnsError from "../components/ShowMissingMandatoryColumnsError";
import ShowMappingError from "../components/ShowMappingError";
import CancelOrSave from "../components/CancelOrSave";
import SaveMappingSuccess from "../components/SaveMappingSuccess";
import SaveMappingError from "../components/SaveMappingError";
import ShowSavedDataSummary from "../components/ShowSavedDataSummary";

const UploadPage = () => {
  const {
    isMappingSuccess,
    isInvalidNumberOfColumnsError,
    isMissingMandatoryColumnsError,
    isMappingError,
    showCancelOrSave,
    savedDataSummary,
  } = useSelector((state) => state.upload);

  console.log(savedDataSummary);

  return (
    <React.Fragment>
      <UploadForm />
      {isMappingSuccess && <ShowMappingSuccess />}
      {isInvalidNumberOfColumnsError && <ShowInvalidNumberOfColumnsError />}
      {isMissingMandatoryColumnsError && <ShowMissingMandatoryColumnsError />}
      {isMappingError && <ShowMappingError />}
      {/* {showCancelOrSave && <CancelOrSave />} */}
      {isMappingSuccess && <SaveMappingSuccess />}
      {isMappingError && <SaveMappingError />}
      {savedDataSummary && <ShowSavedDataSummary />}
    </React.Fragment>
  );
};

export default UploadPage;
