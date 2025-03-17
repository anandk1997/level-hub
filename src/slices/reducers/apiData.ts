import { createSlice } from '@reduxjs/toolkit';
import { initialState } from 'src/store/redux/initialState';
import { apiSlice } from '../apis/app.api';

const apiDataSlice = createSlice({
  name: 'auth',
  initialState: initialState.apiData,

  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.signup.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(apiSlice.endpoints.signup.matchFulfilled, () => {});
    builder.addMatcher(apiSlice.endpoints.signup.matchRejected, (state, action: any) => {
      state.loading = false;

      state.error = action.payload.error;
      state.status = action.payload.success;
    });
  },
});

export const {} = apiDataSlice.actions;

export const apiData = apiDataSlice.reducer;
