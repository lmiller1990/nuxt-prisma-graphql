import { ref, shallowRef, reactive } from "vue";
import pDefer from "p-defer";
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  User,
} from "@auth0/auth0-spa-js";

export interface AppState {
  targetUrl?: string;
}

export const authOptions: Auth0ClientOptions = {
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
} as const;

type OnRedirectCallback = (appState: AppState) => void;

let client = shallowRef<Auth0Client>();

interface AuthInfo {
  error?: string;
  loading?: boolean;
}

const info = reactive<AuthInfo>({
  error: undefined,
  loading: undefined,
});

const user = ref<User | undefined>();

const deferred = pDefer<Auth0Client>();

export function useAuth() {
  if (!client.value) {
    createAuth0Client({
      ...authOptions,
      redirect_uri: window.location.origin,
    }).then((client) => {
      deferred.resolve(client);
    });
  }

  const login = async () => {
    if (!client.value) {
      client.value = await deferred.promise;
    }
    await client.value.loginWithRedirect(authOptions);
    user.value = await client.value.getUser();
  };

  const logout = async (returnTo: string = window.location.origin) => {
    if (!client.value) {
      client.value = await deferred.promise;
    }
    await client.value.logout({ returnTo });
    user.value = await client.value.getUser();
  };

  const authenticate = async (onRedirectCallback: OnRedirectCallback) => {
    if (!client.value) {
      client.value = await deferred.promise;
    }

    try {
      // If the user is returning to the app after authentication.
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        // handle the redirect and retrieve tokens
        const { appState } = await client.value.handleRedirectCallback();

        // Notify subscribers that the redirect callback has happened
        // (useful for retrieving any pre-authentication state)
        onRedirectCallback(appState);
      }
    } catch (e) {
      info.error = (e as Error).message;
    } finally {
      // Initialize our internal authentication state
      user.value = await client.value.getUser();
      info.loading = false;
    }
  };

  return {
    login,
    logout,
    info,
    client,
    user,
    authenticate,
  };
}
