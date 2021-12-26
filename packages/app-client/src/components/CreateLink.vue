<script setup lang="ts">
import { gql, useMutation } from '@urql/vue'
import { CreateLinkDocument } from '../generated/graphql';
import CreateButton from './CreateButton.vue';

gql`
mutation CreateLink ($text: String!, $href: String!, $order: Int!) {
  createLink(text: $text, href: $href, order: $order) {
    id
    links {
      id
      order
      text
    }
  }
}
`

const createLinkMut = useMutation(CreateLinkDocument)

function createLink () {
  createLinkMut.executeMutation({ 
    order: 1,
    text: 'New link...',
    href: 'https://example.com'
  })
}

</script>

<template>
  <form 
    @submit.prevent="createLink"
  >
    <CreateButton type="submit">New Link</CreateButton>
  </form>
</template>
