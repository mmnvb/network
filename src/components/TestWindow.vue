<script setup>
import Graph from "graphology";
import Sigma from "sigma";
import { EdgeLineProgram, EdgeRectangleProgram } from "sigma/rendering";
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import parsedData from '@/assets/group_members.json';

const container = ref();
const graph = new Graph();
let sigmaInstance;

let readyData;
let hash = new Map();
let state = reactive({
  hoveredNode: null,
  hoveredNeighbors: new Set(),
  searchQuery: '', // Для хранения значения поиска
});

const generateHash = () => {
    for (let i = 0; i < readyData.length; i++) {
        for (let e = 0; e < readyData[i].length; e++) {
            let val = hash.get(readyData[i][e]) || [];
            val.push(i);
            hash.set(readyData[i][e], val);
        }
    }
};

const addAllNodes = () => {
    let keys = [...hash.keys()];

    for (let i = 0; i < hash.size; i++) {
        graph.addNode(keys[i], {
            label: keys[i],
            size: 2,
            color: "blue",
            x: Math.random() * readyData.length,
            y: Math.random() * readyData.length / 2
        });
    }
};

const generateEdgesOfPerson = (person) => {
    for (let i = 0; i < person[1].length; i++) {
        for (let r = 0; r < readyData[i].length; r++) {
            if (graph.hasEdge(person[0], readyData[i][r])) {
                continue;
            }

            if (readyData[i][r] !== person[0]) {
                graph.addEdge(person[0], readyData[i][r], { size: 0.000000001 });
            }
        }
    }
};

const addAllEdges = () => {
    for (const person of hash) {
        generateEdgesOfPerson(person);  
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
    sigmaInstance.refresh();
};

const searchNodes = () => {
    const query = state.searchQuery.toLowerCase();
    graph.forEachNode((node, attrs) => {
        const isVisible = attrs.label.toLowerCase().includes(query);
        graph.setNodeAttribute(node, 'hidden', !isVisible);
    });
    sigmaInstance.refresh();
};

const initiateGraph = () => {
    generateHash();
    console.log("Элементов", hash.size, "В среднем вершин:", hash.size * 20);
    addAllNodes();
    addAllEdges();
    console.log("Logic behind. Time to render!");

    console.time();
    sigmaInstance = new Sigma(graph, container.value, {
        defaultEdgeColor: "#e6e6e6",
        type: 'webgl',
        defaultEdgeType: "edges-default",
        edgeProgramClasses: {
            "edges-default": EdgeRectangleProgram,
            "edges-fast": EdgeLineProgram,
        },
        settings: {
            batchSizeNodeDrawing: 100000,
            batchSizeEdgeDrawing: 10000,
        }
    });
    console.timeEnd();

    sigmaInstance.setSetting("nodeReducer", (node, data) => {
        const res = { ...data };

        if (state.hoveredNode && state.hoveredNode !== node && !state.hoveredNeighbors.has(node)) {
            res.color = "#f6f6f6";
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
        setHoveredNode(node);
    });

    sigmaInstance.on("doubleClickNode", () => {
        setHoveredNode(null);
    });
};

onMounted(() => {
    readyData = Object.entries(parsedData).map(x => x[1]);
    initiateGraph();
});

onUnmounted(() => {
    sigmaInstance.kill();
});
</script>

<template>
  <div>
    <input 
      v-model="state.searchQuery" 
      placeholder="Search nodes..." 
      class="search-input" 
    >
    <input
      type="button"
      class="button"
      value="Search"
      @click="searchNodes"
    >
    <div
      ref="container"
      class="border w-full h-screen"
    />
  </div>
</template>
  