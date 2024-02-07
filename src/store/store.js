import { createStore } from "vuex";

import axios from "axios";
import { useEventBus } from "../events/events";
const { emitEvent } = useEventBus();

export const store = createStore({
  state() {
    return {
      ENV: "production",
      hasAccount: true,
      profile: JSON.parse(localStorage.getItem("profile")) || null,
      accessToken: localStorage.getItem("accessToken") || "",
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
    setHasAccount(state, hasAccount) {
      state.hasAccount = hasAccount;
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
      if (state.hasAccount === false) return;
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
      //set the first song to be played in the store
      emitEvent("setChansonEnCours", {
        song: items.find((item) => item.preview_url),
        first: true,
      });

      //set laUne to a random song
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const laUne = {
        preview_url: randomItem.preview_url,
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
    async getAccessTokenWithoutAccount({ commit, state }) {
      let uri = "";
      if (state.ENV === "production") {
        uri = "https://spotify-server-jj29.onrender.com"; //to be changed
      } else {
        uri = "http://localhost:3000";
      }
      const res = await axios.get(uri + "/accessToken");
      commit("setAccessToken", res.data);
      return res.data;
    },
    async saveSong({ state }, song) {
      //put https://api.spotify.com/v1/me/tracks
      //body {ids: [song.id]}
      const res = await axios.put(
        `https://api.spotify.com/v1/me/tracks`,
        { ids: [song.id] },
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return res.data;
    },
    async isSaved({ state }, song) {
      const res = await axios.get(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${song.id}`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return res.data[0];
    },
  },
});
