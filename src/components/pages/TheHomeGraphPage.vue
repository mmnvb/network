<script setup>
import { defineAsyncComponent, ref} from 'vue'
import { Button } from '@/components/ui/button'

const TheGraphWindow = defineAsyncComponent(() =>
  import('@/components/TheGraphWindow.vue')
)

const isHidden = ref(false)

</script>

<template>
  <section
    class="h-dvh w-full flex flex-col justify-around items-center"
  >
    <div>
      <h2 class="text-6xl">
        Network graph
      </h2>
    </div>

    <div
      v-if="!isHidden"
      class="container w-3/4 flex justify-center items-center border rounded backdrop-blur"
    >
      <Button

        @click="isHidden=true"
      >
        Load graph
      </Button>
    </div>

    <TheGraphWindow
      v-else
      id="graph"
      class="self-center overflow-hidden"
    />
  </section>
</template>

<style scoped>
.container{
    height: 35rem;
    background-color: rgba(128, 128, 128, 0.08);
}
</style>