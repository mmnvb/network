<script setup>
import TheGraphChart from '@/components/TheGraphChart.vue'
import { useHashStore } from "@/stores/hash.js";

const hashStore = useHashStore()
</script>

<template>
  <div class="w-3/4">
    <!-- todo: make load on click -->
    <TheGraphChart />
  </div>
</template>