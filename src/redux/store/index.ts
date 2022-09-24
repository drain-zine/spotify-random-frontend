import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { audioSlice } from '../slice/audio';
import { playlistSlice } from '../slice/playlist';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [audioSlice.name]: audioSlice.reducer,
      [playlistSlice.name]: playlistSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
