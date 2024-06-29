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
        class="text-4xl lg:text-5xl m-0"
      >
        Network graph
      </h2>
    </div>

    <div
      
      class="container w-11/12 lg:w-3/4 flex justify-center items-center backdrop-blur"
      :class="{'initial border rounded': !isHidden}"
    >
      <div
        v-if="!isHidden"
        class="flex flex-col gap-2 items-center"
      >
        <Button
          @click="isHidden=true"
        >
          Load graph
        </Button>
        <i class="text-slate-500">It's recommended to use a PC</i>
      </div>
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