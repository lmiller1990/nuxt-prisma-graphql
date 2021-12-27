import { createApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

const router = createRouter();

createApp(App).use(router).mount("#app");
