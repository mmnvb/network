<script setup>
import Graph from "graphology";
import Sigma from "sigma";
import { EdgeLineProgram, EdgeRectangleProgram } from "sigma/rendering";

import {ref, onMounted, onUnmounted} from 'vue'
import { useHashStore } from "@/stores/hash.js";
import { NODE_COLOR, NODE_SIZE, SELECT_COLOR, SELECT_SIZE, EDGE_SIZE, NODE_BACK_COLOR } from "@/config";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const hashStore = useHashStore()

const container = ref()
const graph = new Graph();
let sigmaInstance;

const isClicked = ref(false)
const lastNode = ref()
const searchQuery = ref()

let state = {
  hoveredNode: null,
  hoveredNeighbors: new Set(),
  selectedNodes: new Set()
};


const addAllNodes = () => {
    let keys = [...hashStore.hash.keys()]

    for (let i = 0; i<hashStore.hash.size;i++){
        graph.addNode(keys[i], {
            label: keys[i],
            size: NODE_SIZE,
            color: NODE_COLOR,
            x: Math.random()*window.innerWidth,
            y: Math.random()*window.innerHeight
        })
    }

    console.log("Элементов", hashStore.hash.size, "В среднем вершин:", hashStore.hash.size*20)
}

const generateEdgesOfPerson = (node, groups) => {
    for (let i of groups) {
        for (let r of hashStore.readyData[i]) {
            if (graph.hasEdge(node, r) || r == node) {
                continue;
            }
            graph.addEdge(node, r, { size: EDGE_SIZE });
        }
    }
};


const setHoveredNode = (node) => {
    if (node) {
        state.hoveredNode = node;
        state.hoveredNeighbors = new Set(graph.neighbors(node));
    } else {
        state.hoveredNode = null;
        state.hoveredNeighbors = new Set();
    }
    sigmaInstance.refresh({
      skipIndexation: true,
    });
};


const searchNodes = () => {
    console.log(searchQuery.value)
    state.selectedNodes.clear()
    if(searchQuery.value == '' || searchQuery.value == undefined){
        return
    }

    const query = searchQuery.value.toLowerCase();

    graph.forEachNode((node, attrs) => {
        if (attrs.label.toLowerCase().includes(query)){
            state.selectedNodes.add(node)
        }
    });

    sigmaInstance.refresh({
      skipIndexation: true,
    });
};


const initiateGraph = () => {
    addAllNodes();
    
    sigmaInstance = new Sigma(graph, container.value, {
        defaultEdgeColor: "#B2BAC6",
        type: 'webgl',
        defaultEdgeType: "edges-default",
        edgeProgramClasses: {
            "edges-default": EdgeRectangleProgram,
            "edges-fast": EdgeLineProgram,
        }
    });

    // Используем reducers для динамического изменения внешнего вида узлов и ребер
    sigmaInstance.setSetting("nodeReducer", (node, data) => {
        const res = { ...data };

        if (state.hoveredNode && state.hoveredNode !== node && !state.hoveredNeighbors.has(node)) {
            res.color = NODE_BACK_COLOR;
        }

        if (state.selectedNodes.has(node)){
            res.color = SELECT_COLOR
            res.size = SELECT_SIZE
        }

        return res;
    });

    sigmaInstance.setSetting("edgeReducer", (edge, data) => {
        const res = { ...data };

        if (state.hoveredNode && !graph.hasExtremity(edge, state.hoveredNode)) {
            res.hidden = true; 
        }

        return res;
    });


    sigmaInstance.on("clickNode", ({ node }) => {
        if(!isClicked.value || lastNode.value!=node){
            generateEdgesOfPerson(node, hashStore.hash.get(node))
            setHoveredNode(node);
            isClicked.value = true
            lastNode.value = node
            return
        }
        graph.clearEdges();
        setHoveredNode(null);
        isClicked.value = false
    });
};

onMounted(()=>{
    initiateGraph()
})

onUnmounted(()=>{
    sigmaInstance.kill()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="w-2/5 flex gap-3 self-end">
      <Input
        type="text"
        placeholder="Search"
        v-model="searchQuery"
      />
      <Button @click="searchNodes">
        Search
      </Button>
    </div>
            
    <div
      ref="container"
      class="h-96 border rounded"
    />
  </div>
</template>