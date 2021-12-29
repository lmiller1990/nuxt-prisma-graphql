import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

declare global {
  interface Window {
    links: string
  }
}

createApp(App, { links: JSON.parse(window.links) || [] }).mount("#app");
