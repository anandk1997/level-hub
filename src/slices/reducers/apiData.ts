import { createSlice } from '@reduxjs/toolkit';
import { initialState } from 'src/store/initialState';
import { apiSlice } from '../apis/auth.api';

const apiDataSlice = createSlice({
  name: 'auth',
  initialState: initialState.apiData,

  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.getCADFileURL.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(apiSlice.endpoints.getCADFileURL.matchFulfilled, (state, action) => {
      state.loading = false;

      state.cadFileUrl = action.payload.cadFileUrl;
      state.error = action.payload.error;
      state.status = action.payload.success;
    });
    builder.addMatcher(apiSlice.endpoints.getCADFileURL.matchRejected, (state, action: any) => {
      state.loading = false;

      state.error = action.payload.error;
      state.status = action.payload.success;
    });

    builder.addMatcher(apiSlice.endpoints.getAvailableViews.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(apiSlice.endpoints.getAvailableViews.matchFulfilled, (state, action) => {
      state.loading = false;

      state.views = action.payload.views;
      state.error = action.payload.error;
      state.status = action.payload.success;
    });
    builder.addMatcher(apiSlice.endpoints.getAvailableViews.matchRejected, (state, action: any) => {
      state.loading = false;

      state.error = action.payload.error;
      state.status = action.payload.success;
    });

    builder.addMatcher(apiSlice.endpoints.getDrawingURL.matchPending, (state) => {
      state.viewDrawingLoading = true;
    });
    builder.addMatcher(apiSlice.endpoints.getDrawingURL.matchFulfilled, (state, action) => {
      state.viewDrawingLoading = false;

      state.drawingUrl = action.payload.data;
      state.error = action.payload.error;
      state.status = action.payload.success;
    });
    builder.addMatcher(apiSlice.endpoints.getDrawingURL.matchRejected, (state, action: any) => {
      state.viewDrawingLoading = false;

      state.error = action.payload.error;
      state.status = action.payload.success;
    });
  },
});

export const {} = apiDataSlice.actions;

export const apiData = apiDataSlice.reducer;
