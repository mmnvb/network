<script setup>
import { Button } from '@/components/UI/button'
</script>

<template>
  <div
    class="
    nav-box flex justify-center items-center
    w-screen h-12 border mb-2 py-8 backdrop-blur-lg
    "
  >
    <div class="w-3/4 flex justify-between items-center">
      <Button
        variant="ghost"
        class="text-base"
      >
        Home
      </Button>
      <div class="flex gap-5">
        <Button
          variant="ghost"
          class="text-base"
        >
          About
        </Button>
        <Button
          variant="ghost"
          class="text-base"
        >
          Tools
        </Button>
        <Button
          variant="ghost"
          class="text-base"
        >
          Graph
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-box{
    position: fixed;
    overflow: hidden;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.733);
}
</style>