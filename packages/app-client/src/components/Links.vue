<script setup lang="ts">
import { gql, useMutation, useQuery } from "@urql/vue";
import { computed, onMounted, ref, watch } from "vue";
import { LinkForm, validateLinkForm } from "../forms/models";
import { LinksFragment, PreviewDocument, SaveLinksDocument } from "../generated/graphql";
import FloatingButton from './FloatingButton.vue'
import Link, { LinkKey } from "./Link.vue";
import Preview from "./Preview.vue";

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
query Preview ($theme: ThemeName!) {
  preview(theme: $theme)
}
`

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

const showPreview = ref(false)

onMounted(() => {
  form.value = props.gql.links.map(x => ({
    id: x.id,
    text: x.text,
    href: x.href,
    order: x.order,
  }));
})

const orderedForm = computed(() => {
  return validateLinkForm(form.value).sort((x, y) => x.order - y.order);
});

const formValid = computed(() => orderedForm.value.every(x => !x.href.error && !x.text.error))

const handleUpdate = (id: number, key: LinkKey, val: string) => {
  form.value.find((x) => x.id === id)![key] = val;
};

async function handleSaveAndPreview () {
  await saveLinks.executeMutation({
    links: form.value.map(x => ({
      id: x.id,
      href: x.href,
      text: x.text
    }))
  })
  showPreview.value = true
}
</script>

<template>
  <Preview v-if="showPreview" />

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
      v-if="showPreview"
      @click="showPreview = false"
    >
      Close
    </FloatingButton>

    <FloatingButton 
      v-else
      :disabled="!formValid"
      @click="handleSaveAndPreview"
    >
      Save and Preview
    </FloatingButton>
  </div>
</template>
