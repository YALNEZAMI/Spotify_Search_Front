import { createStore } from "vuex";
import axios from "axios";
export const store = createStore({
  state() {
    return {
      accessToken: "",
      chansons: [],
      artistes: [],
      albums: [],
    };
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    async searchSongs({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return res.data.tracks.items;
    },
    async searchArtists({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return res.data.artists.items;
    },
    async searchAlbums({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=album`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return res.data.albums.items;
    },
  },
});
