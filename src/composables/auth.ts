import { ref, shallowRef } from "vue";
import createAuth0Client, { Auth0Client, Auth0ClientOptions, RedirectLoginOptions, User } from "@auth0/auth0-spa-js";

export interface AppState {
  targetUrl?: string
}

export const authOptions: Auth0ClientOptions = {
  client_id: "B6q5B5AazxXq5pjypivtOyEmOvlJtUNn",
  domain: "dev-p-8qknej.us.auth0.com",
} as const

const onRedirectCallback = (appState: AppState) =>
  window.history.replaceState({}, document.title, window.location.pathname);

export function useAuth(onRedirectCallback: (appState: AppState) => void) {
  const error = ref<Error>();
  const loading = ref(false);
  const isAuthenticated = ref(false);
  const user = ref<User | undefined>();
  let auth0Client: Auth0Client

  const authenticate = async () => {
    auth0Client = await createAuth0Client({
      ...authOptions,
      redirect_uri: window.location.origin,
    });

    console.log(auth0Client)

    try {
      // If the user is returning to the app after authentication..
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        // handle the redirect and retrieve tokens
        const { appState } = await auth0Client.handleRedirectCallback();

        console.log({ appState });

        // Notify subscribers that the redirect callback has happened, passing the appState
        // (useful for retrieving any pre-authentication state)
        onRedirectCallback(appState);
      }
    } catch (e) {
      console.log(e)
      error.value = e as Error;
    } finally {
      // Initialize our internal authentication state
      console.log('ok')
      isAuthenticated.value = await auth0Client.isAuthenticated();
      user.value = await auth0Client.getUser();
      loading.value = false;
    }

    return auth0Client
  };

  return {
    error,
    loading,
    isAuthenticated,
    user,
    authenticate
  };
}
