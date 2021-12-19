<script lang="ts" setup>
import { useAuth } from "../composables/auth";
import Links from './Links.vue'
import { gql, useMutation, useQuery } from '@urql/vue'
import { AppDocument, AuthenticateDocument, LogoutDocument } from '../generated/graphql';
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

gql`
mutation Logout {
  logout {
    __typename
  }
}
`

const result = useQuery({ query: AppDocument })
// const authenticate = useMutation(AuthenticateDocument)
const destroySession = useMutation(LogoutDocument)

const getuser = () => result.executeQuery({})

bus.on('authenticated', async (email: string) => {
  // await authenticate.executeMutation({ email })
  // result.executeQuery({ requestPolicy: 'network-only' }).then(console.log)
})

const logout = async () => {
  // await destroySession.executeMutation({}) 
  _logout()
}

const { user, login, logout: _logout, info, authenticate } = useAuth();

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
</template>
