<script setup>
import Graph from "graphology";
import Sigma from "sigma";

import {ref, onMounted, onUnmounted} from 'vue'
import parsedData from '@/assets/group_members.json'

const container = ref()
const graph = new Graph();
let sigmaInstance;

const initiateGraph = () =>{
    graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
    graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
    graph.addEdge("1", "2", { size: 5, color: "purple" });

    sigmaInstance = new Sigma(graph, container.value);
    console.log(parsedData)
}

onMounted(()=>{
    initiateGraph()
})

onUnmounted(()=>{
    sigmaInstance.kill()
})
</script>

<template>
  <div
    ref="container"
    class="container border h-96"
  />
</template>