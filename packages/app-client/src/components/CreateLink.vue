<script setup lang="ts">
import { gql, useMutation } from '@urql/vue'
import { CreateLinkDocument } from '../generated/graphql';

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
    order: 0,
    text: 'aaa',
    href: 'https://google.com'
  })
}

</script>

<template>
  <form 
    @submit.prevent="createLink"
  >
    <button type="submit">Submit</button>
  </form>
</template>
