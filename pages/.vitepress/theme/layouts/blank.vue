<template lang="pug">
// this is where markdown content will be rendered
.pageContainer
  GraphCanvas
  .noteContent
    Content
</template>

<script setup>
import { useData } from 'vitepress'
// import Graph from "../components/Graph.vue";
import GraphCanvas from "../components/GraphCanvas.vue";
const pageData =useData()
</script>

<style lang="stylus">
//@import '../styles/vp-doc.css'
@import '../styles/retro.styl'
@import '../styles/media.styl'
@import '../styles/utils.styl'
@import '../styles/variables.styl'
html
  height 100%
*
  margin 0
  padding 0
* *:before *:after
  box-sizing border-box

html, body
  min-height 100%
  height 100%
  display block

#app
  min-height 100%
  height 100%
  width 100%
  animation fadeIn ease-in-out .6s
@keyframes fadeIn
  from
    opacity 0
    filter: blur(22.2px)
  to
    opacity 1
    filter: blur(0)
</style>