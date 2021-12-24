<script lang="ts" setup>
import { useAuth } from "../composables/auth";
import Links from './Links.vue'
// import CreateLink from './CreateLink.vue'
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

const getuser = () => result.executeQuery({})

const { login, logout } = useAuth();


</script>

<template>
  <div>Welcome, {{ result?.data?.value?.viewer?.email }}</div>
  
  <button @click="login()">Login</button>
  <button @click="logout()">Logout</button>
  <button @click="getuser()">get user</button>

  <Links 
    v-if="result.data.value?.viewer" 
    :gql="result?.data.value.viewer" 
  />


  <!-- <CreateLink /> -->
</template>