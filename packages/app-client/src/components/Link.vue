<script setup lang="ts">
import { ValidatedLinkForm } from "../forms/models";
import Input, { InputValidationResult } from "./Input.vue";

export type LinkKey = "href" | "text";

const props = defineProps<{
  link: ValidatedLinkForm;
}>();

const emits = defineEmits<{
  (e: "update", id: number, key: LinkKey, val: string): void;
}>();

const validityFor = (attr: LinkKey): InputValidationResult => ({
  valid: !props.link[attr].error,
  reason: props.link[attr].error,
});
</script>

<template>
  <div class="p-2 my-2 rounded-md border border-gray-300">
    <Input
      :modelValue="props.link.text.val"
      @update:modelValue="(val) => emits('update', props.link.id, 'text', val)"
      label="Text"
      :id="props.link.id.toString()"
      :validity="validityFor('text')"
      :required="true"
    />

    <Input
      :modelValue="props.link.href.val"
      @update:modelValue="(val) => emits('update', props.link.id, 'href', val)"
      label="Link"
      :id="props.link.id.toString()"
      :validity="validityFor('href')"
      :required="true"
    />
  </div>
</template>
