<script setup lang="ts">
import { gql, useMutation } from "@urql/vue";
import { computed, ref, watchEffect } from "vue";
import { LinkForm, validateLinkForm } from "../forms/models";
import { LinksFragment, SaveLinksDocument } from "../generated/graphql";
import FloatingButton from './FloatingButton.vue'
import Link, { LinkKey } from "./Link.vue";

gql`
  fragment Links on User {
    links {
      id
      text
      href
      order
    }
  }
`;

gql`
mutation SaveLinks ($links: [SaveLinkInput!]!) {
  saveLinks (links: $links) {
    id
    email
    ...Links
  }
}
`

const saveLinks = useMutation(SaveLinksDocument)

const props = defineProps<{
  gql: LinksFragment;
}>();

const form = ref<LinkForm[]>([]);

watchEffect(() => {
  form.value = props.gql.links.map((x) => ({
    id: x.id,
    text: x.text,
    href: x.href,
    order: x.order,
  }));
});

const orderedForm = computed(() => {
  return validateLinkForm(form.value).sort((x, y) => x.order - y.order);
});

const formValid = computed(() => orderedForm.value.every(x => !x.href.error && !x.text.error))

const handleUpdate = (id: number, key: LinkKey, val: string) => {
  form.value.find((x) => x.id === id)![key] = val;
};

function handleSaveAndPreview () {
  saveLinks.executeMutation({
    links: form.value.map(x => ({
      id: x.id,
      href: x.href,
      text: x.text
    }))
  })
}
</script>

<template>
  <div v-for="link of orderedForm">
    <Link
      :link="link"
      :key="link.id"
      @update="(id, key, val) => handleUpdate(id, key, val)"
    />
  </div>

  <div 
    id="lock-to-bottom" 
    class="absolute inset-x-0 bottom-4 mx-2"
  >
    <FloatingButton 
      :disabled="!formValid"
      @click="handleSaveAndPreview"
    >
      Save and Preview
    </FloatingButton>
  </div>
</template>
