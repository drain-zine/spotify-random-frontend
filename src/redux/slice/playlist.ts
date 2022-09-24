import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { Playlist, PlaylistMeta } from '@type';
import { API } from '@api';
import { generateDescription, generateName } from '@utils';

// First, create the thunk
export const getRandomPlaylist = createAsyncThunk(
  'playlist/getRandomPlaylist',
  async () => {
    const api = new API();
    try {
      const response = await api.getRandomPlaylist();
      return response;
    } catch (err) {
      throw err;
    }
  },
);

export const getRandomPlaylistMeta = createAsyncThunk(
  'playlist/getRandomPlaylistMeta',
  async () => {
    const api = new API();
    const image = await api.getRandomImage();
    return {
      name: generateName(),
      description: generateDescription(),
      image,
    };
  },
);

export interface PlaylistState {
  playlist: Playlist;
  playlistMeta: PlaylistMeta;
  playlistError: boolean;
}

const initialPlaylistMeta = {
  name: '',
  description: '',
  image: '',
};

const initialState: PlaylistState = {
  playlist: [],
  playlistMeta: initialPlaylistMeta,
  playlistError: false,
};

// Slice
export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },

    setPlaylistMeta(state, action) {
      state.playlistMeta = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(getRandomPlaylist.rejected, (state, action) => {
      state.playlistError = true;
      state.playlist = [];
    });
    builder.addCase(getRandomPlaylist.pending, (state, action) => {
      state.playlistError = false;
      state.playlist = [];
    });
    builder.addCase(getRandomPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload;
    });
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
    builder.addCase(getRandomPlaylistMeta.pending, (state, action) => {
      state.playlistMeta = initialPlaylistMeta;
    });
    builder.addCase(getRandomPlaylistMeta.fulfilled, (state, action) => {
      state.playlistMeta = action.payload;
    });
  },
});

export const { setPlaylist, setPlaylistMeta } = playlistSlice.actions;

export const selectPlaylist = (state: AppState) => state.playlist.playlist;
export const selectPlaylistMeta = (state: AppState) =>
  state.playlist.playlistMeta;
export const selectIsPlaylistLoading = (state: AppState) =>
  state.playlist.playlist.length === 0;
export const selectIsPlaylistMetaLoading = (state: AppState) =>
  state.playlist.playlistMeta.name === '' ||
  state.playlist.playlistMeta.description === '' ||
  state.playlist.playlistMeta.image === '';

export const selectIsPlaylistErrored = (state: AppState) =>
  state.playlist.playlistError;
export default playlistSlice.reducer;
