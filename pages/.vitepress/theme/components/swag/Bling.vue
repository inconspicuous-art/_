<template lang="pug">
.container
  main
    slot
  Renderer(ref="renderer" alpha="true" resize="true")
    Camera(:position="{ z: 2 }")
    Scene
      PointLight(:position="{ y: 50, z: 50 }" color="#d8bfd8")
      // Frame of the box
      Icosahedron(ref="icosahedron" :rotation="icosahedron.rotation")
        PhysicalMaterial(color="#96fbc7")
      Dodecahedron(ref="dodecahedron" :rotation="dodecahedron.rotation")
        PhysicalMaterial(color="#f7ffae")
</template>

<script setup>
import { ref, onMounted } from 'vue';
const renderer = ref(null)
const icosahedron = ref({
  rotation: { x: 0, y: 0, z: 0 },
});
const dodecahedron = ref({
  rotation: { x: 0, y: 0, z: 0 },
});
import TWEEN from '@tweenjs/tween.js';
onMounted(() => {
  // Rotate the icosahedron and dodecahedron around all three axes. The rotation speed is determined by the value of the rotationSpeed property.
  // Start animation loop.
  const getRandomAngle = (pow = 1) =>  {
    return Math.random() * Math.PI * pow;
  }
  const animate = () => {
    new TWEEN.Tween(icosahedron.value.rotation)
      .to({ x: getRandomAngle( 1/4), y: getRandomAngle(1/4), z: getRandomAngle(1/4) }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(dodecahedron.value.rotation)
      .to({ x: getRandomAngle(), y: getRandomAngle(), z: getRandomAngle() }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    setTimeout(animate, 1000);
  }
  animate()
})
</script>

<style lang="stylus" scoped>
.container, main
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
    z-index 101
</style>