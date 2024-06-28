<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <div
    class="
    nav-box flex justify-center items-center
    w-screen h-12 border py-8 backdrop-blur-lg
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
    top:0;
    left: 0;
    overflow: hidden;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.733);
}
</style>