import { ref, shallowRef, reactive } from "vue";
import createAuth0Client, {
  Auth0Client,
  User,
} from "@auth0/auth0-spa-js";
import { authOptions, redirectUri } from "../environ";
import pDefer from "../util/pDefer";

export interface AppState {
  targetUrl?: string;
}
type OnRedirectCallback = (appState: AppState) => void;

const client = shallowRef<Auth0Client>();

interface AuthInfo {
  error?: string;
  loading?: boolean;
}

const info = reactive<AuthInfo>({
  error: undefined,
  loading: undefined,
});

const user = ref<User | undefined>();

let deferred = pDefer<Auth0Client>();

export function useAuth() {
  if (!client.value) {
    createAuth0Client({
      ...authOptions,
      redirect_uri: redirectUri
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
    reset: () => {
      user.value = undefined
      info.loading = false
      info.error = undefined
      client.value = undefined
      deferred = pDefer()
    }
  };
}
