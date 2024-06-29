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
    id="graph"
  >
    <div>
      <h2
        class="text-6xl m-0"
      >
        Network graph
      </h2>
    </div>

    <div
      
      class="container w-3/4 flex justify-center items-center backdrop-blur"
      :class="{'initial border rounded': !isHidden}"
    >
      <Button
        v-if="!isHidden"
        @click="isHidden=true"
      >
        Load graph
      </Button>
      <TheGraphWindow
        v-else
        id="graph"
        class="self-center overflow-hidden"
      />
    </div>
  </section>
</template>

<style scoped>
.container{
    height: 40rem;
}

.initial{
  background-color: rgba(128, 128, 128, 0.08);
}

</style>