import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { Playlist, PlaylistMeta } from "../type";


export interface PlaylistState {
  playlist: Playlist;
  playlistMeta: PlaylistMeta;
}


const initialState: PlaylistState = {
    playlist: {} as Playlist,
    playlistMeta: {
        name: '',
        description: '',
        image: ''
    }
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

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.audio,
        };
      },
    },

  },
});

export const { setPlaylist, setPlaylistMeta } = playlistSlice.actions;

export const selectPlaylist = (state: AppState) => state.playlist.playlist;
export const selectPlaylistMeta = (state: AppState) => state.playlist.Meta;

export default playlistSlice.reducer;