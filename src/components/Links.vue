<script setup lang="ts">
import { gql } from "@urql/vue";
import { computed, ref, watchEffect } from "vue";
import { LinkForm, validateLinkForm } from "../forms/models";
import { LinksFragment } from "../generated/graphql";
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

const handleUpdate = (id: number, key: LinkKey, val: string) => {
  form.value.find((x) => x.id === id)![key] = val;
};
</script>

<template>
  <div v-for="link of orderedForm">
    <Link
      :link="link"
      :key="link.id"
      @update="(id, key, val) => handleUpdate(id, key, val)"
    />
  </div>
  {{ orderedForm }}
</template>
