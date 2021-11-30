import { Auth0ClientOptions } from "@auth0/auth0-spa-js";

export const authOptions: Auth0ClientOptions = {
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
} as const;

export const redirectUri = window.location.origin
