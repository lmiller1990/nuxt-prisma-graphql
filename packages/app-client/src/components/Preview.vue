<script lang="ts" setup>
import { useQuery } from "@urql/vue";
import { PreviewDocument } from "../generated/graphql";

const preview = useQuery({
  query: PreviewDocument,
  variables: { theme: "forest" },
  requestPolicy: 'network-only'
});

const arr = Array(1000).fill('a').map((x, idx) => `Number: ${idx}`)
</script>

<template>
  <teleport to="#preview">
    <iframe
      v-if="preview.data.value?.preview"
      :srcdoc="preview.data.value?.preview"
      class="h-full fixed w-full overflow-scroll"
    /> 
  </teleport>
</template>

<style scoped>
/* iframe {
  height: 100vh;
  position: fixed;
  width: 100%;
  overflow-y: scroll !important;
}  */
</style>
