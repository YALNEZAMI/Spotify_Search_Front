import { createStore } from "vuex";

import axios from "axios";
export const store = createStore({
  state() {
    return {
      profile: JSON.parse(localStorage.getItem("profile")) || "{}",
      accessToken: JSON.parse(localStorage.getItem("")) || "",
      searchKey: "",
      chansons: [],
      searchedChansons: [],
      myChansons: [],
      myPlaylists: [],
      artists: [],
      searchedArtists: [],
      searchedPlaylists: [],
      albums: [],
      searchedAlbums: [],
    };
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
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
    logout(state) {
      localStorage.clear();
      state.profile = {};
      state.accessToken = "";
      state.chansons = [];
      state.artists = [];
      state.albums = [];
    },
    setSearchedChansons(state, chansons) {
      state.searchedChansons = chansons;
    },
    setSearchedArtists(state, artists) {
      state.searchedArtists = artists;
    },
    setSearchedAlbums(state, albums) {
      state.searchedAlbums = albums;
    },
    setSearchedPlaylists(state, playlists) {
      state.searchedPlaylists = playlists;
    },
    setMyChansons(state, chansons) {
      state.myChansons = chansons;
    },
    setMyPlaylists(state, playlists) {
      state.myPlaylists = playlists;
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
      commit("setAccessToken", access_token);
      return access_token;
    },

    //get profile from spotify api
    async getProfile({ state, commit }) {
      const result = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${state.accessToken}` },
      });
      commit("setProfile", result.data);
      return result.data;
    },
    //
    async searchSongs({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=track&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const items = res.data.tracks.items;
      commit("setSearchedChansons", items);
      return items;
    },
    async getDefaultSongs({ commit, state }) {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let key = letters[Math.floor(Math.random() * letters.length)];

      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=track&limit=50`,
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
        `https://api.spotify.com/v1/search?q=${key}&type=artist&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );

      const items = res.data.artists.items;
      commit("setSearchedArtists", items);
      return items;
    },
    async getDefaultArtists({ commit, state }) {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let key = letters[Math.floor(Math.random() * letters.length)];
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=artist&limit=20`,
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
    async getDefaultPlaylists({ commit, state }) {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let key = letters[Math.floor(Math.random() * letters.length)];
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=playlist`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );

      const items = res.data.playlists.items;
      commit("setSearchedPlaylists", items);
      return items;
    },
    async searchAlbums({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=album&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const items = res.data.albums.items;

      commit("setSearchedAlbums", items);
      return items;
    },
    async getDefaultAlbums({ commit, state }) {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let key = letters[Math.floor(Math.random() * letters.length)];
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=album&limit=50`,
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

    async getMyPlaylists({ commit, state }) {
      const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      const items = res.data.items;

      commit("setMyPlaylists", items);
      return items;
    },
    async searchPlaylists({ commit, state }, key) {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${key}&type=playlist`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      const items = res.data.playlists.items;
      commit("setSearchedPlaylists", items);
      return items;
    },
    //recuperer mes chansons
    // async getMySongs({ commit, state }) {
    //   const res = await axios.get(
    //     `https://api.spotify.com/v1/me/tracks?limit=50`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${state.accessToken}`,
    //       },
    //     }
    //   );
    //   const items = res.data.items;

    //   commit("setMyChansons", items);
    //   return items;
    // },
    //recuperer mes chansons aimées
    // async getMyLikedSongs({ commit, state }) {
    //   const res = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
    //     headers: {
    //       Authorization: `Bearer ${state.accessToken}`,
    //     },
    //   });
    //   const items = res.data.items;

    //   commit("setMyChansons", items);
    //   return items;
    // },
  },
});
