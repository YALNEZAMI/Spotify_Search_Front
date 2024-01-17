import { createStore } from "vuex";
import axios from "axios";
export const store = createStore({
  state() {
    return {
      profile: JSON.parse(localStorage.getItem("profile")) || "{}",
      accessToken: JSON.parse(localStorage.getItem("")) || "",
      searchKey: "",
      chansons: [],
      artists: [],
      albums: [],
    };
  },
  mutations: {
    setToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setSearchKey(state, key) {
      state.searchKey = key;
    },
    setChansons(state, chansons) {
      state.chansons = chansons;
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setProfile(state, profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
      state.profile = profile;
    },
  },
  actions: {
    async getAccessToken({ commit }, { clientId, code }) {
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:4200/login");
      params.append("code_verifier", verifier);

      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const { access_token } = await result.json();
      commit("setToken", access_token);
      localStorage.setItem("accessToken", access_token);
      return access_token;
    },
    async getRefreshToken({ state, commit }) {
      // refresh token that has been previously stored
      const refreshToken = localStorage.getItem("refresh_token");
      const url = "https://accounts.spotify.com/api/token";

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: state.accessToken,
          client_id: clientId,
        }),
      };
      const body = await axios.post(url, payload);

      localStorage.setItem("access_token", response.accessToken);
      localStorage.setItem("refresh_token", response.refreshToken);
    },
    async getProfile({ state, commit }) {
      const result = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${state.accessToken}` },
      });
      commit("setProfile", result.data);
      return result.data;
    },
    //the endpoint is not working
    async getDefaultSongs({ commit, state }) {
      const res = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return res.data.tracks.items;
    },
    async searchSongs({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const items = res.data.tracks.items;
      commit("setChansons", items);
      return items;
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

      const items = res.data.artists.items;
      commit("setArtists", items);
      return items;
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
      const items = res.data.albums.items;

      commit("setAlbums", items);
      return items;
    },
  },
});
