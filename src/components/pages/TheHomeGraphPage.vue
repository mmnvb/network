<script setup>
import TheGraphWindow from "@/components/TheGraphWindow.vue"
</script>

<template>
  <section
    class="h-dvh w-full flex flex-col justify-around items-center"
  >
    <h2 class="text-6xl">
      Network graph
    </h2>


    <TheGraphWindow
      id="graph"
      class="self-center overflow-hidden"
    />
  </section>
</template>