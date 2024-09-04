import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CsvDataState {
  data: any[];
}

const initialState: CsvDataState = {
  data: [],
};

const csvDataSlice = createSlice({
  name: "csvData",
  initialState,
  reducers: {
    setCsvData: (state, action: PayloadAction<any[]>) => {
      state.data = Array.isArray(action.payload) ? action.payload : [];
    },
    clearCsvData: (state) => {
      state.data = [];
    },
  },
});

export const { setCsvData, clearCsvData } = csvDataSlice.actions;
export default csvDataSlice.reducer;
