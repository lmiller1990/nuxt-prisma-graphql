<script setup lang="ts">
import Main from './components/Main.vue'
</script>

<template>
  <suspense>
    <template #default>
      <Main />
    </template>
    <template #fallback>
      Loading
    </template>
  </suspense>
</template>
