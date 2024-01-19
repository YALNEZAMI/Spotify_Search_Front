import { createStore } from "vuex";

import axios from "axios";
export const store = createStore({
  state() {
    return {
      ENV: "production",
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
      laUne: {
        img: "/default_music.jpg",
        url: "",
        name: "Unkown",
      },
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
    setUne(state, une) {
      state.laUne = une;
    },
  },
  actions: {
    async getAccessToken({ commit, state }, { clientId, code }) {
      let redirect_uri = "";
      if (state.ENV === "production") {
        redirect_uri = "https://spotify-searcher.onrender.com";
      } else {
        redirect_uri = "http://localhost:4200";
      }
      const verifier = localStorage.getItem("verifier");
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", redirect_uri);
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
    async getDefaultChansons({ commit, state }) {
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
      //set laUne to a random song
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const laUne = {
        img: randomItem.album.images[0].url,
        url: randomItem.external_urls.spotify,
        name: randomItem.name,
      };
      commit("setUne", laUne);
      //set chansons in the store
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
