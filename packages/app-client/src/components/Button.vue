<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    disabled: false,
    loading: false
  }
);
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    class="
      bg-purple-700
      hover:bg-purple-500
      focus:outline-none focus:ring-2 focus:ring-purple-200
      shadow-xl
      text-white
      font-semibold
      h-12
      px-6
      rounded-lg
      w-full
      flex
      items-center
      justify-center
      disabled:bg-purple-200
    "
    :class="{ 'bg-purple-300': props.loading }"
  >
    <slot />
  </button>
</template>
