<script lang="ts" setup>
import GoLive from './GoLive.vue'
import { gql, useQuery } from '@urql/vue'
import { GoLiveDocument } from '../generated/graphql';

gql`
query GoLive {
  viewer {
    id
    email
  } 
  ...GoLive
}
`

const result = await useQuery({ query: GoLiveDocument })
</script>

<template>
  <suspense>
    <template #default>
      <GoLive v-if="result.data.value?.viewer" :gql="result?.data.value" />
    </template>

    <template #fallback>Loading...</template>
  </suspense>
</template>