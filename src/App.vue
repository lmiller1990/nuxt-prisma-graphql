<script setup lang="ts">
import Main from './components/Main.vue'
import { useRouter } from 'vue-router';
import { useAuth, AppState } from './composables/auth'
import { createClient, provideClient } from "@urql/vue";

const client = createClient({
  url: 'http://localhost:8080/graphql',
});

provideClient(client);

const { authenticate, user } = useAuth()

const router = useRouter()

const onRedirectCallback = (appState: AppState) => {
  router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
}

authenticate(onRedirectCallback)
</script>

<template>
  <Suspense>
    <template #default>
      <Main />
    </template>
    <template #fallback>
      Loading
    </template>
  </Suspense>
</template>
