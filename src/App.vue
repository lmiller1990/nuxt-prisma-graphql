<script setup lang="ts">
import Main from './components/Main.vue'
import { useRouter } from 'vue-router';
import { useAuth, AppState } from './composables/auth'

const router = useRouter()

const onRedirectCallback = (appState: AppState) => {
  router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
}

const { authenticate } = useAuth()
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
