<script setup>

import TheNavBar from '@/components/TheNavbar.vue'
import GraphWindow from '@/components/GraphWindow.vue'
</script>

<template>
  <TheNavBar />
  <GraphWindow class="test" />
</template>

<style scoped>
.test{
  height: 150rem;
}
</style>
