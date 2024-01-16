import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Login from "../views/Login.vue";

// import ChansonsView from "../views/ChansonsView.vue";
// import ArtistsView from "../views/ArtistsView.vue";
// import AlbumsView from "../views/AlbumsView.vue";

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
      path: "/home",
      component: HomePage,
      //   children: [
      //     {
      //       path: "/chansons",
      //       component: ChansonsView,
      //     },
      //     {
      //       path: "/artists",
      //       component: ArtistsView,
      //     },
      //     { path: "/albums", component: AlbumsView },
      //   ],
    },
    // {
    //   path: "/about",
    //   component: () => import("../pages/About.vue"),
    // },
  ],
});
