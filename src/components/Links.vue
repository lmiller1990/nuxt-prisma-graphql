<script setup lang="ts">
import { gql } from '@urql/vue'
import { LinksFragment } from '../generated/graphql';
import Link from './Link.vue'

gql`
fragment Links on User {
  links {
    ...Link
  }
}
`

const props = defineProps<{
  gql: LinksFragment
}>()
</script>

<template>
  <div v-for="link of props.gql.links">
    <Link :gql="link" :key="link.id" />
  </div>
</template>
