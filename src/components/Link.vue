<script setup lang="ts">
import { gql } from '@urql/vue'
import { reactive } from 'vue';
import type { LinkFragment } from '../generated/graphql';
import { Mutable } from '../utilTypes';

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

type LinkForm = Mutable<Pick<LinkFragment, 'text' | 'href'>>

const linkForm = reactive<LinkForm>({
  href: props.gql.href,
  text: props.gql.text,
})
</script>

<template>
  <div>
    <input v-model="linkForm.text" />
    <input v-model="linkForm.href" />
  </div>
</template>
