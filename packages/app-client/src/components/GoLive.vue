<script lang="ts" setup>
import { gql } from '@urql/core';
import { GoLiveFragment } from '../generated/graphql';

gql`
mutation UpdateUser($username: String!, $profile: String!) {
  updateUser(username: $username, profile: $profile) {
    username
    profile
  }
}
`

gql`
fragment GoLive on Query {
  viewer {
    username
    profile
  }
}
`
const props = defineProps<{
  gql: GoLiveFragment
}>()


</script>

<template>
  <Input
    :modelValue="props.link.text.val"
    @update:modelValue="(val) => emits('update', props.link.id, 'text', val)"
    label="Text"
    :id="`${props.link.id.toString()}-text`"
    :validity="validityFor('text')"
    :required="true"
  />
<
</template>