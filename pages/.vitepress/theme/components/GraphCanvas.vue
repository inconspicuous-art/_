<template lang="pug">
.graphView(ref="canvasContainer")
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ForceGraph from 'force-graph';
import {useData} from "vitepress";

// declare a ref to hold the element reference
// the name must match template ref value
const canvasContainer = ref(null)
const data = useData()
const display = data.site.value.themeConfig.graph

onMounted(async () => {
  // const graphData = {
  //   nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
  //   links: [{ source: 0, target: 1 }]
  // }

  const graphData = {
    nodes: display.nodes.map(edge => ({ id: edge.v, ...edge })),
    links: display.edges.map(edge => ({
      source: edge.v,
      target: edge.w,
    }))
  }
  console.log(graphData)
  const myGraph = ForceGraph()
      .nodeAutoColorBy('id')
    .nodeColor('#ffff00')
    .nodeLabel(node => node.id);
  myGraph(canvasContainer.value)
    .graphData(graphData);
})
</script>

<style lang="stylus" scoped>
.graphView {
  width: 100%;
  height: 100%;
  .node {
    fill: #fff;
    stroke: #000;
    stroke-width: 1.5px;
    stroke-opacity: 0.5;
  }
}
</style>