import { createApp } from "vue";
import App from "./App.vue";
import type { Link } from '@packages/types'
import "./index.css";

declare global {
  interface Window {
    links: Link[]
  }
}

createApp(App, { links: window.links || [] }).mount("#app");
