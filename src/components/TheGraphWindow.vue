<script setup>
import TheGraphChart from '@/components/TheGraphChart.vue'
import { useHashStore } from "@/stores/hash.js";

const hashStore = useHashStore()
</script>

<template>
  <div class="w-full">
    <!-- todo: make load on click -->
    <TheGraphChart v-if="hashStore.ready" />
    <div
      v-else
      class="flex justify-center items-center"
    >
      Loading
    </div>
  </div>
</template> 