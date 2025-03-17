import logger from 'redux-logger';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';

import { apiSlice } from 'src/slices/apis/app.api';

import { apiData } from 'src/slices/reducers/apiData';
import { submittalDrawing } from 'src/slices/reducers/SubmittalDrawing';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { env } from 'src/utils/env';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const reducer = combineReducers({
  apiData,
  submittalDrawing,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

const serialize = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    env.NODE_ENV === 'development'
      ? getDefaultMiddleware(serialize).concat(apiSlice.middleware, logger)
      : getDefaultMiddleware(serialize).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
