<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
}>(),
  {
    disabled: false,
  }
);
</script>

<template>
  <button
    :disabled="props.disabled"
    class="
      bg-green-700
      hover:bg-green-500
      focus:outline-none focus:ring-2 focus:ring-green-200
      text-white
      text-md
      h-8
      px-3
      rounded-lg
      w-full
      flex
      items-center
      justify-center
      disabled:bg-green-200
    "
  >
    <slot />
  </button>
</template>

