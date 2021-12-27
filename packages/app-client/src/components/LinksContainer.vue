<template>
  <suspense>
    <template #default>
      <Links 
        v-if="result.data.value?.viewer" 
        :gql="result?.data.value.viewer" 
      />
    </template> 

    <template #fallback>
      Loading...
    </template> 
  </suspense>
</template>

<script lang="ts" setup>
import Links from './Links.vue'
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

const result = await useQuery({ query: AppDocument })
</script>