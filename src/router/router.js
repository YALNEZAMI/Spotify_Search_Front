import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Login from "../views/Login.vue";

import ChansonsView from "../views/ChansonsView.vue";
import ArtistsView from "../views/ArtistsView.vue";
import AlbumsView from "../views/AlbumsView.vue";
import Profile from "../views/Profile.vue";
import SearchPage from "../views/SearchPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
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
