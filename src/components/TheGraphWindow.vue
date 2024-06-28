<script setup>
import TheGraphChart from '@/components/TheGraphChart.vue'
import { useHashStore } from "@/stores/hash.js";

const hashStore = useHashStore()
</script>

<template>
  <div class="w-3/4">
    <!-- todo: make load on click -->
    <TheGraphChart v-if="hashStore.ready" />
    <div
      v-else
      class="flex justify-center items-center border rounded container"
    >
      Loading
    </div>
  </div>
</template> 

<style scoped>
.container{
    height: 35rem;
}
</style>