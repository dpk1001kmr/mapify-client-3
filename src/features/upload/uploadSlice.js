import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMappingSuccess: false,
  isInvalidNumberOfColumnsError: false,
  isMissingMandatoryColumnsError: false,
  isMappingError: false,
  data: null,
  showCancelOrSave: false,
  savedDataSummary: null,
  columnNamesMappingFormat: null,
  columnNamesMappingFormatClient: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setIsMappingSuccess: (state, action) => {
      state.isMappingSuccess = action.payload;
    },
    setIsInvalidNumberOfColumnsError: (state, action) => {
      state.isInvalidNumberOfColumnsError = action.payload;
    },
    setIsMissingMandatoryColumnsError: (state, action) => {
      state.isMissingMandatoryColumnsError = action.payload;
    },
    setIsMappingError: (state, action) => {
      state.isMappingError = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setShowCancelOrSave: (state, action) => {
      state.showCancelOrSave = action.payload;
    },
    setSavedDataSummary: (state, action) => {
      state.savedDataSummary = action.payload;
    },
    setColumnNamesMappingFormat: (state, action) => {
      state.columnNamesMappingFormat = action.payload;
    },
    setColumnNamesMappingFormatClient: (state, action) => {
      const { sheetName, key, value } = action.payload;
      // Initialize columnNamesMappingFormatClient if it's null
      if (!state.columnNamesMappingFormatClient) {
        state.columnNamesMappingFormatClient = {};
      }

      // Initialize specific sheet mapping if not already present
      if (!state.columnNamesMappingFormatClient[sheetName]) {
        state.columnNamesMappingFormatClient[sheetName] = {};
      }

      // Finally set the key-value pair for that sheet
      state.columnNamesMappingFormatClient[sheetName][key] = value;
    },
  },
});

export const {
  setIsMappingSuccess,
  setIsInvalidNumberOfColumnsError,
  setIsMissingMandatoryColumnsError,
  setIsMappingError,
  setData,
  setShowCancelOrSave,
  setSavedDataSummary,
  setColumnNamesMappingFormat,
  setColumnNamesMappingFormatClient,
} = uploadSlice.actions;

export default uploadSlice.reducer;
