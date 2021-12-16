<script setup lang="ts">
import { gql } from '@urql/vue'
import type { LinkFragment } from '../generated/graphql';

gql`
fragment Link on Link {
  id
  order
  text
}
`

const props = defineProps<{
  gql: LinkFragment
}>()
</script>

<template>
  <li>{{ props.gql.text }}</li>
</template>
