<script setup>
import TheGraphChart from '@/components/TheGraphChart.vue'
import { useHashStore } from "@/stores/hash.js";

const hashStore = useHashStore()
</script>

<template>
  <div class="w-full">
    <TheGraphChart v-if="hashStore.ready" />
    <div
      v-else
      class="flex justify-center items-center gap-2 flex-col"
    >
      <div
        class="loader"
      />
      <p class="ml-2">
        Loading...
      </p>
    </div>
  </div>
</template> 

<style scoped>
.loader{
  width: 2rem;
  height: 2rem;
  border: solid transparent;
  border-radius: 4px;
  background-color: #2563EB;
  animation: loader 2s infinite ease;
}

@keyframes loader {
  0%{
    transform: rotateX(0deg);
  }
  100%{
    transform: rotateX(360deg);
  }
}
</style>