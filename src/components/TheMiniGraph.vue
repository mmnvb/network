<script setup>
import Graph from "graphology";
import Sigma from "sigma";

import {ref, onMounted, onUnmounted} from 'vue'

const graph = new Graph();
const container = ref()
let render;

const init = () => {
    graph.addNode("1", { label: "Student 1", x: 0, y: 0, size: 16, color: "#2563EB" });
    graph.addNode("2", { label: "Student 2", x: 1, y: 1, size: 16, color: "#2563EB" });

    graph.addNode("3", { label: "Student 3", x: 1.5, y: -0.5, size: 16, color: "#2563EB" });

    graph.addEdge("1", "2", { size: 3, color: "#B2BAC6" });
    graph.addEdge("2", "3", { size: 3, color: "#B2BAC6" });

    render = new Sigma(graph, container.value);
}

onMounted(()=>{
    init()
})

onUnmounted(()=>{
    render.kill()
})
</script>

<template>
  <div
    ref="container"
    class="h-3/6"
  />
</template>