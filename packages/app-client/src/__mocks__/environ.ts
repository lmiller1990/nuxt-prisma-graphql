import { Auth0ClientOptions } from "@auth0/auth0-spa-js";

export const authOptions: Auth0ClientOptions = {
  client_id: 'client_id',
  domain: 'http://test.domain'
} as const;

export const redirectUri = '/'

