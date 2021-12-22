<script setup lang="ts">
import Main from "./components/Main.vue";
import { useRouter } from "vue-router";
import { useAuth, AppState } from "./composables/auth";
import { createClient, provideClient, fetchExchange } from "@urql/vue";
import { cacheExchange } from '@urql/exchange-graphcache';
import { authExchange } from "@urql/exchange-auth";
import { Operation } from "@urql/core";

const { authenticate, user, getIdTokenClaims } = useAuth();

import { makeOperation } from "@urql/core";

const addAuthToOperation = ({
  authState,
  operation,
}: {
  authState: {
    token?: string | null;
  };
  operation: Operation;
}) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  const headers = {
    ...fetchOptions.headers,
    Authorization: `Bearer ${authState.token}`
  };

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers,
    },
  });
};

const client = createClient({
  url: "http://localhost:8080/graphql",
  exchanges: [
    authExchange({
      getAuth: async ({ authState }) => {
        if (!authState) {
          const token = await getIdTokenClaims();

          if (token) {
            return { token };
          }
          return null;
        }

        return null;
      },
      addAuthToOperation,
    }),
    cacheExchange({
      updates: {
        // createLink: (result, args, cache, info) => {

        // }
      }
    }),
    fetchExchange,
  ],
});

provideClient(client);

const router = useRouter();

const onRedirectCallback = (appState: AppState) => {
  router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

authenticate(onRedirectCallback).then(() => console.log(user.value));
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <Main />
      </div>
    </template>
    <template #fallback> Loading </template>
  </Suspense>
</template>
