<script lang="ts" setup>
import { useAuth } from "../composables/auth";
import Links from './Links.vue'
import CreateLink from './CreateLink.vue'
import { gql, useQuery } from '@urql/vue'
import { AppDocument } from '../generated/graphql';

gql`
query App {
  viewer {
    id
    email
    ...Links
  } 
}
`

const result = useQuery({ query: AppDocument })

const { login, logout } = useAuth();
</script>

<template>
  <div>Welcome, {{ result?.data?.value?.viewer?.email }}</div>
  
  <button @click="login()">Login</button>
  <button @click="logout()">Logout</button>
  <router-link to="/links">Links</router-link>
  <router-link to="/go-live">Go Live</router-link>
  <div class="m-2">

  <div class="my-2 flex justify-end">  
    <CreateLink />
  </div> 

  view is
  <router-view />

  </div> 
</template>