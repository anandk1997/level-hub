import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from 'src/store/redux/initialState';

const submittalDrawingSlice = createSlice({
  name: 'submittalDrawing',
  initialState: initialState.submittalDrawing,

  reducers: {
    storeUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
      state.tagSummary = { ...state.tagSummary, ...action.payload };
    },

    storeEnterInfoError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },

    storeSizingConfigIds(state, action: PayloadAction<{ sizing_id: string; config_id: string }>) {
      state.sizing_id = action.payload.sizing_id;
      state.config_id = action.payload.config_id;
    },

    storeEnterInfoErrorForSizingConfigId(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
  },

  extraReducers: () => {},
});

export const {
  storeUserData,
  storeEnterInfoError,
  storeSizingConfigIds,
  storeEnterInfoErrorForSizingConfigId,
} = submittalDrawingSlice.actions;

export const submittalDrawing = submittalDrawingSlice.reducer;
