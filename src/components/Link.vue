<script setup lang="ts">
import { computed, ref, Ref, watch } from "vue";
import { ValidatedLinkForm } from "../forms/models";
import Input, { InputValidationResult } from "./Input.vue";

export type LinkKey = "href" | "text";

const props = defineProps<{
  link: ValidatedLinkForm;
}>();

const emits = defineEmits<{
  (e: "update", id: number, key: LinkKey, val: string): void;
}>();

interface FormInput {
  id: "href" | "text";
  label: string;
  type: "text";
  val: Ref<string>;
  validity: InputValidationResult;
}

const inputs = computed<FormInput[]>(() => {
  return [
    {
      id: "href",
      validity: {
        valid: !props.link.href.error,
        reason: props.link.href.error,
      },
      label: "Link",
      val: ref(props.link.href.val || ""),
      type: "text",
    },
    {
      id: "text",
      validity: {
        valid: !props.link.text.error,
        reason: props.link.text.error,
      },
      label: "Text",
      val: ref(props.link.text.val || ""),
      type: "text",
    },
  ];
});

watch(inputs.value[0].val, (val) => {
  console.log(`updating`, props.link.id, val);
  emits("update", props.link.id, "text", val);
});

watch(inputs.value[1].val, (val) => {
  emits("update", props.link.id, "href", val);
});

const validity = computed<InputValidationResult>(() => {
  return {
    valid: !props.link.href.error,
    reason: props.link.href.error,
  };
});
</script>

<template>
  <div class="shadow-xl">
    <Input
      :modelValue="props.link.href.val"
      @update:modelValue="(val) => $emit('update', props.link.id, 'href', val)"
      label="Link"
      :id="props.link.id.toString()"
      :validity="validity"
      :required="true"
    />
  </div>
</template>
