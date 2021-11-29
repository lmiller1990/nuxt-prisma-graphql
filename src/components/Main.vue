<script lang="ts" setup>
import { authOptions, useAuth } from '../composables/auth'
import { useRouter } from 'vue-router';
import { AppState } from '../composables/auth';

const router = useRouter()

const onRedirectCallback = (appState: AppState) => {
  router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
}

const {
  error,
  loading,
  isAuthenticated,
  user,
  authenticate
} = useAuth(onRedirectCallback)

const auth0Client = await authenticate()

const login = () => auth0Client.loginWithRedirect(authOptions)
</script>

<template>
  <div>
    Error {{ error }}
  </div>

  <div>
    loading {{ loading }}
  </div>

  <div>
    isAuthenticated {{ isAuthenticated }}
  </div>

  <div>
    user {{ user }}
  </div>

  <button @click="login">Login</button>
</template>
