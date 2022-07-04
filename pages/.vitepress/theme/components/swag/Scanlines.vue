<template lang="pug">
.container
  main
    slot
  .clickable(v-if="show")
    Renderer(ref="renderer" alpha="true" resize="true")
      Camera(:position="{ z: 2 }")
      Scene
        PointLight(:position="{ y: 50, z: 50 }" color="#d8bfd8")
        // Frame of the box
        Box(ref="clickableBox"   :position="{ x: 0, y: 0, z: 0 }"
          :rotation="{ x: 0, y: 0, z: 0 }"
          :scale="{ x: 1, y: 1, z: 1 }"
          :cast-shadow="false"
          :receive-shadow="false"
          @click="boxClicked"
          )
          PhysicalMaterial(color="#96fbc7")
        Box(ref="box"   :position="{ x: 0, y: 0, z: 0 }"
          :rotation="{ x: 0, y: 0, z: 0 }"
          :scale="{ x: 10, y: 10, z: 0.1 }"
          :cast-shadow="false"
          :receive-shadow="false")
          PhysicalMaterial(color="#f7ffae")
</template>

<script setup>
// use the ref box to access the box mesh
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';
let show = ref(true)
const boxClicked = (e) => {
  console.log(e)
  e.component.mesh.material.color.set(0xffffff);
  //remove box
  show.value = false;
}
const box = ref(null);
const clickableBox = ref(null);
</script>

<style lang="stylus" scoped>
.container, main, .clickable
  position fixed
  bottom 0
  right 0
  left 0
  top 0
  height 100%
  min-height 100vh
  width 100%
  z-index 100
  main
    z-index 102
    //click-trough
    pointer-events none
.clickable
  cursor pointer
  z-index 101
  &:hover
    color 0xff0000
  &:active
    color 0x00ff00
</style>