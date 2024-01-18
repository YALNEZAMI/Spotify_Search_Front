import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Login from "../views/Login.vue";

import ChansonsView from "../views/ChansonsView.vue";
import ArtistsView from "../views/ArtistsView.vue";
import AlbumsView from "../views/AlbumsView.vue";
import Profile from "../views/Profile.vue";
import SearchPage from "../views/SearchPage.vue";
import MyPlayLists from "../views/MyPlayLists.vue";
import DefaultPlaylists from "../views/DefaultPlaylists.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/chansons",
      component: ChansonsView,
    },
    {
      path: "/artists",
      component: ArtistsView,
    },
    { path: "/albums", component: AlbumsView },
    { path: "/myplaylists", component: MyPlayLists },
    { path: "/playlists", component: DefaultPlaylists },

    {
      path: "/home",
      component: HomePage,
    },
    {
      path: "/search",
      component: SearchPage,
    },
  ],
});
