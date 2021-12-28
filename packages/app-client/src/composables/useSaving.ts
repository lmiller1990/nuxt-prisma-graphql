import { Ref, ref } from "vue";


interface UseSaving {
  handle: () => Promise<any>
}

export function useSaving (useSaving: UseSaving) {
  const saving = ref(false)

  return {
    saving,
    execute: async () => {
      saving.value = true
      await useSaving.handle()
      saving.value = false
    }
  }
}