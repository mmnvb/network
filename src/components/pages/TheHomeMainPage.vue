<script setup>
import { Button } from '@/components/ui/button'
import IconArrow from '@/components/icons/IconArrowTopRight.vue'

import { ref, onMounted, defineAsyncComponent, onUnmounted } from 'vue'

const TheMiniGraph = defineAsyncComponent(() =>
  import('@/components/TheMiniGraph.vue')
)

const isLg = ref(false)

const handleResize = () => {
  isLg.value = window.innerWidth >= 1024
}

onMounted(()=>{
  isLg.value = window.innerWidth >= 1024
  window.addEventListener('resize', handleResize)
})

onUnmounted(()=>{
  window.removeEventListener('resize', handleResize)
})

</script>

<template>
  <header class="h-dvh w-full overflow-hidden flex justify-center">
    <div class="flex mt-16 w-4/5 lg:w-3/4">
      <div class="w-full lg:w-1/2 flex flex-col justify-evenly">
        <h1 class="title lg:text-8xl font-bold text-left leading-tight">
          Networking <span class="boujee-text">graph</span> of my university
        </h1>
        <div class="flex flex-col gap-y-16">
          <aside class="text-slate-500">
            Let's use the beauty of modern Web to visialize<br>
            every person you have studied with
          </aside>
          <a href="#graph">
            <Button class="w-32">
              Graph
              <IconArrow class="w-4 h-4 ml-1" /> 
            </Button>
          </a>
        </div>
      </div>
      <div
        v-if="isLg"
        class="w-4/5 lg:w-1/2 flex flex-col justify-center"
      >
        <TheMiniGraph />
      </div>
    </div>
  </header>
</template>

<style scoped>
.title{
  font-size: 3.375rem;
}

@media (min-width: 1024px) {
  .title{
    font-size: 6rem;
  } 
}

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