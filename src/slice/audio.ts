import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

// Type for our state
export interface AudioState {
  isPlayingUrl: string;
}

// Initial state
const initialState: AudioState = {
  isPlayingUrl: '',
};

// Slice
export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    // Action to set isPlayingUrl
    setIsPlayingUrl(state, action) {
      state.isPlayingUrl = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export const { setIsPlayingUrl } = audioSlice.actions;

export const selectIsPlayingUrl = (state: AppState) => state.audio.isPlayingUrl;

export default audioSlice.reducer;
