<script setup lang="ts">
import { gql } from '@urql/vue'
import { reactive } from 'vue';
import type { LinkFragment } from '../generated/graphql';

gql`
fragment Link on Link {
  id
  order
  text
  href
}
`

const props = defineProps<{
  gql: LinkFragment
}>()

type LinkForm = Pick<LinkFragment, 'text' | 'href'>

const linkForm = reactive<LinkForm>({
  href: '',
  text: ''
})
</script>

<template>
  <div>
    <input v-model="text" />
  </div>
</template>
