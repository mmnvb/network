<script setup>
import { Button } from '@/components/ui/button'
import IconGithub from './icons/IconGithub.vue';
</script>

<template>
  <div
    class="
    nav-box flex justify-center items-center
    w-screen h-12 border py-8 backdrop-blur-lg
    "
  >
    <div class="w-4/5 lg:w-3/4 flex justify-between items-center">
      <a href="#">
        <Button
          variant="ghost"
          class="text-base"
        >
          Home
        </Button>
      </a>
      <div class="flex gap-5">
        <a href="#about">
          <Button
            variant="ghost"
            class="text-base"
          >
            About
          </Button>
        </a>
        <!-- <Button
          variant="ghost"
          class="text-base"
        >
          Tools
        </Button> -->
        <a href="#graph">
          <Button
            class="text-base"
          >
            Graph
          </Button>
        </a>
        <a
          href="https://github.com/mmnvb/network"
          target="_blank"
        >
          <Button
            class="rounded-full"
            variant="outline"
          >
            <IconGithub />
          </Button>
        </a>
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