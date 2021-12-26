<script setup lang="ts">
import { gql, useMutation, useQuery } from "@urql/vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { LinkForm, validateLinkForm } from "../forms/models";
import {
  LinksFragment,
  PreviewDocument,
  SaveLinksDocument,
} from "../generated/graphql";
import Button from "./Button.vue";
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
  query Preview($theme: ThemeName!) {
    preview(theme: $theme)
  }
`;

gql`
  mutation SaveLinks($links: [SaveLinkInput!]!) {
    saveLinks(links: $links) {
      id
      email
      ...Links
    }
  }
`;

const saveLinks = useMutation(SaveLinksDocument);

const props = defineProps<{
  gql: LinksFragment;
}>();

const form = ref<LinkForm[]>([]);

const showPreview = ref(false);

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

const formValid = computed(() =>
  orderedForm.value.every((x) => !x.href.error && !x.text.error)
);

const handleUpdate = (id: number, key: LinkKey, val: string) => {
  form.value.find((x) => x.id === id)![key] = val;
};

async function handleSaveAndPreview() {
  const links = form.value.map((x) => ({
    id: x.id,
    href: x.href,
    text: x.text,
  }));
  await saveLinks.executeMutation({ links });

  showPreview.value = true;
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

  <div class="fixed bottom-4 inset-x-0 mx-2">
    <Button
      class="w-20 absolute bottom-0 right-0"
      v-if="showPreview"
      @click="showPreview = false"
      bg="purple"
    >
      Close
    </Button>

    <Button
      v-else
      :disabled="!formValid"
      @click="handleSaveAndPreview"
      bg="purple"
    >
      Save and Preview
    </Button>
  </div>
</template>
