<script setup>
import { EDGE_COLOR, NODE_COLOR } from "@/config";
import Graph from "graphology";
import Sigma from "sigma";
import ForceSupervisor from "graphology-layout-force/worker";

import {ref, onMounted, onUnmounted} from 'vue'

const graph = new Graph();
const container = ref()
let render;
let lastNum = 4

const init = () => {
    graph.addNode("1", { label: "Student 1", x: 0, y: 0, size: 30, color: NODE_COLOR });
    graph.addNode("2", { label: "Student 2", x: 1, y: 1, size: 20, color: NODE_COLOR });

    graph.addNode("3", { label: "Student 3", x: 1.5, y: -0.5, size: 16, color: NODE_COLOR });
    graph.addNode("4", { label: "Student 4", x: 1.2, y: -0.5, size: 16, color: NODE_COLOR });

    graph.addEdge("1", "2", { size: 3, color: EDGE_COLOR });
    graph.addEdge("2", "3", { size: 3, color: EDGE_COLOR });
    graph.addEdge("4", "2", { size: 3, color: EDGE_COLOR });

    render = new Sigma(graph, container.value, {
      labelFont: 'system-ui'
    });

    const layout = new ForceSupervisor(graph, { isNodeFixed: (_, attr) => attr.highlighted });
    layout.start();

    let draggedNode = null;
    let isDragging = false;

    // On mouse down on a node
    //  - we enable the drag mode
    //  - save in the dragged node in the state
    //  - highlight the node
    //  - disable the camera so its state is not updated
    render.on("downNode", (e) => {
      isDragging = true;
      draggedNode = e.node;
      graph.setNodeAttribute(draggedNode, "highlighted", true);
    });

    // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
    render.getMouseCaptor().on("mousemovebody", (e) => {
      if (!isDragging || !draggedNode) return;

      // Get new position of node
      const pos = render.viewportToGraph(e);

      graph.setNodeAttribute(draggedNode, "x", pos.x);
      graph.setNodeAttribute(draggedNode, "y", pos.y);

      // Prevent sigma to move camera:
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    // On mouse up, we reset the autoscale and the dragging mode
    render.getMouseCaptor().on("mouseup", () => {
      if (draggedNode) {
        graph.removeNodeAttribute(draggedNode, "highlighted");
      }
      isDragging = false;
      draggedNode = null;
    });

    // Disable the autoscale at the first down interaction
    render.getMouseCaptor().on("mousedown", () => {
      if (!render.getCustomBBox()) render.setCustomBBox(render.getBBox());
    });

    render.on("clickStage", ({ event } ) => {
    // Sigma (ie. graph) and screen (viewport) coordinates are not the same.
    // So we need to translate the screen x & y coordinates to the graph one by calling the sigma helper `viewportToGraph`
    const coordForGraph = render.viewportToGraph({ x: event.x, y: event.y });

    // We create a new node
    lastNum += 1
    const node = {
      ...coordForGraph,
      size: Math.random() * (30 - 10) + 10,
      color: NODE_COLOR,
      label: `Student ${lastNum}`
    };

    // Searching the two closest nodes to auto-create an edge to it
    const closestNodes = graph
      .nodes()
      .map((nodeId) => {
        const attrs = graph.getNodeAttributes(nodeId);
        const distance = Math.pow(node.x - attrs.x, 2) + Math.pow(node.y - attrs.y, 2);
        return { nodeId, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);

    graph.addNode(lastNum, node);

    // We create the edges
    closestNodes.forEach((e) => graph.addEdge(lastNum, e.nodeId));
  });
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