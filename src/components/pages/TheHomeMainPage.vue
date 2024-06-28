<script setup>
import { Button } from '@/components/ui/button'
import IconArrow from '@/components/icons/IconArrowTopRight.vue'

import TheMiniGraph from "@/components/TheMiniGraph.vue"

</script>

<template>
  <header class="h-dvh w-full overflow-hidden flex justify-center">
    <div class="flex mt-16 w-3/4">
      <div class="w-1/2 flex flex-col justify-evenly">
        <h1 class="text-7xl font-bold text-left leading-snug">
          Network <span class="boujee-text">graph</span> of my university's students
        </h1>
        <div class="flex flex-col gap-y-16">
          <aside class="text-slate-500">
            Let's use the beauty of modern Web to visialize<br>
            every person you have studied with
          </aside>
          <a href="#">
            <Button class="w-32">
              Graph
              <IconArrow class="w-4 h-4 ml-1" /> 
            </Button>
          </a>
        </div>
      </div>
      <div class="w-1/2 flex flex-col justify-center">
        <TheMiniGraph />
      </div>
    </div>
  </header>
</template>

<style scoped>
.boujee-text {
  --bg-size: 400%;
  --color-one: hsl(221, 83%, 53%);
  --color-two: hsl(261, 83%, 53%);
  background: linear-gradient(
                90deg,
                var(--color-one),
                var(--color-two),
                var(--color-one)
              ) 0 0 / var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes move-bg {
  to {
    background-position: var(--bg-size) 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .boujee-text {
    animation: move-bg 8s linear infinite;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
</style>