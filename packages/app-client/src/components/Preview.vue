<script lang="ts" setup>
import { useQuery } from "@urql/vue";
import { PreviewDocument } from "../generated/graphql";

const preview = useQuery({
  query: PreviewDocument,
  variables: { theme: "forest" },
});
</script>

<template>
  <teleport to="#preview">
    <iframe 
      v-if="preview.data.value?.preview" 
      :srcdoc="preview.data.value?.preview"
      class="absolute w-full h-full"
    />
  </teleport>
</template>