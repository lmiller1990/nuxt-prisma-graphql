<script lang="ts" setup>
import { useAuth } from "../composables/auth";
import Links from './Links.vue'
import FloatingButton from './FloatingButton.vue'
// import CreateLink from './CreateLink.vue'
import { gql, useQuery } from '@urql/vue'
import { AppDocument } from '../generated/graphql';
import { ref } from "vue";

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

const formValid = ref(false)
</script>

<template>
  <div>Welcome, {{ result?.data?.value?.viewer?.email }}</div>
  
  <button @click="login()">Login</button>
  <button @click="logout()">Logout</button>
  <button @click="getuser()">get user</button>

  <Links 
    v-if="result.data.value?.viewer" 
    :gql="result?.data.value.viewer" 
    @linksUpdated="allValid => formValid = allValid"
  />

  <div 
    id="lock-to-bottom" 
    class="absolute inset-x-0 bottom-4 mx-2"
  >
    <FloatingButton 
      :disabled="!formValid"
    >
      Save and Preview
    </FloatingButton>
  </div>

  <!-- <CreateLink /> -->
</template>

<style>
#lock-to-bottom {
}
</style>