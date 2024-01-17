import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Login from "../views/Login.vue";

// import ChansonsView from "../views/ChansonsView.vue";
// import ArtistsView from "../views/ArtistsView.vue";
import Profile from "../views/Profile.vue";
import SearchPage from "../views/SearchPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
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
      path: "/home",
      component: HomePage,
      children: [
        // {
        //   path: "/search",
        //   component: SearchPage,
        // },
        // {
        //   path: "/artists",
        //   component: ArtistsView,
        // },
        // { path: "/albums", component: AlbumsView },
      ],
    },
    {
      path: "/search",
      component: SearchPage,
    },
  ],
});
