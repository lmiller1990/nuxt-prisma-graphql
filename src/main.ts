import { createApp } from "vue";
import App from "./App.vue";
import Main from "./components/Main.vue";
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Main,
      path: "/",
    },
  ],
});

createApp(App).use(router).mount("#app");
