import { Auth0ClientOptions } from "@auth0/auth0-spa-js";

export const authOptions: Auth0ClientOptions = {
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  scope: 'openid profile email',
  audience: 'https://dev-p-8qknej.us.auth0.com/api/v2/'
} as const;

export const redirectUri = window.location.origin
