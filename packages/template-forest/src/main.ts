import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

export interface Link {
  href: string;
  text: string;
}

declare global {
  interface Window {
    links: string
  }
}

const links: Link[] = [
  {
    href: "https://lachlan-miller.me",
    text: "My website",
  },
  {
    href: "https://github.com/lmiller1990",
    text: "GitHub",
  },
  {
    href: "https://twitter.com/Lachlan19900",
    text: "Twitter",
  },
];

createApp(App, { links: JSON.parse(window.links) || [] }).mount("#app");
