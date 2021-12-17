<script lang="ts" setup>
import { useAuth } from "../composables/auth";
import Links from './Links.vue'
import { gql, useMutation, useQuery } from '@urql/vue'
import { AppDocument, AuthenticateDocument } from '../generated/graphql';
import { bus } from "../emitter";

gql`
query App {
  viewer {
    email
    ...Links
  } 
}
`

gql`
mutation Authenticate ($email: String!) {
  authenticate(email: $email) {
    id
  }
}
`

const result = useQuery({ query: AppDocument })
const authenticate = useMutation(AuthenticateDocument)

bus.on('authenticated', async (email: string) => {
  await authenticate.executeMutation({ email })
  result.executeQuery()
})

const { user, login, logout, info } = useAuth();
</script>

<template>
  <div>Error {{ info.error }}</div>

  <div>loading {{ info.loading }}</div>

  <div>user {{ user }}</div>

  <button @click="login()">Login</button>
  <button @click="logout()">Logout</button>

  <Links 
    v-if="result.data.value?.viewer" 
    :gql="result?.data.value.viewer" 
  />
</template>
