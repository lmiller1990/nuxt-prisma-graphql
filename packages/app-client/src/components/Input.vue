<script setup lang="ts">
export interface InputValidationResult {
  valid: boolean;
  reason?: string;
}

const props = withDefaults(
  defineProps<{
    label: string;
    id: string;
    modelValue: string;
    validity?: InputValidationResult;
    required?: boolean;
  }>(),
  {
    required: false,
    validity: () => ({
      valid: false,
    }),
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emits("update:modelValue", target.value);
}
</script>

<template>
  <div class="py-1">
    <label :for="props.id" class="text-sm block">
      {{ props.label }}
    </label>

    <input
      :value="props.modelValue"
      @input="handleInput"
      :id="props.id"
      class="
        border border-gray-300
        rounded-md
        p-1
        w-full
        invalid:border-red-500 invalid:text-red-600
        focus:invalid:border-red-500 focus:invalid:ring-red-500
      "
      :required="props.required"
    />

    <div class="text-red-500 text-xs mt-1" v-if="props.validity.reason">
      {{ props.validity.reason }}
    </div>
  </div>
</template>
