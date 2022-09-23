import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { Playlist, PlaylistMeta } from "../type";
import { API } from "../api";

// First, create the thunk
export const getRandomPlaylist = createAsyncThunk(
  "playlist/getRandomPlaylist",
  async () => {
    const api = new API();
    const response = await api.getRandomPlaylist();
    return response;
  }
);

export interface PlaylistState {
  playlist: Playlist;
  playlistMeta: PlaylistMeta;
}

const initialState: PlaylistState = {
  playlist: [],
  playlistMeta: {
    name: "",
    description: "",
    image: "",
  },
};

// Slice
export const playlistSlice = createSlice({
  name: "playlist",
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
    builder.addCase(getRandomPlaylist.pending, (state, action) => {
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
  },
});

export const { setPlaylist, setPlaylistMeta } = playlistSlice.actions;

export const selectPlaylist = (state: AppState) => state.playlist.playlist;
export const selectPlaylistMeta = (state: AppState) =>
  state.playlist.playlistMeta;
export const selectIsPlaylistLoading = (state: AppState) =>
  state.playlist.playlist.length === 0;
export default playlistSlice.reducer;
