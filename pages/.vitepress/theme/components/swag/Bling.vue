<template lang="pug">
.container
  main
    slot
  Renderer(ref="renderer" alpha=true resize="true")
    Camera(:position="{ z: 2 }")
    Scene
      PointLight(:position="{ y: 50, z: 50 }" color="#d8bfd8")
      // Frame of the box
      Icosahedron(ref="icosahedron" :rotation="icosahedronRotation")
        PhysicalMaterial(color="#96fbc7")
      Dodecahedron(ref="dodecahedron" :rotation="dodecahedronRotation")
        PhysicalMaterial(color="#f7ffae")
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as TWEEN from '@tweenjs/tween.js';

const icosahedronRotation = ref({ x: 0, y: 0, z: 0 });
const dodecahedronRotation = ref({ x: 0, y: 0, z: 0 });
const icosahedron = ref(null);
const dodecahedron = ref(null);
// Rotate the icosahedron and dodecahedron around all three axes. The rotation speed is determined by the value of the rotationSpeed property.
const getRandomAngle = (pow = 1) =>  {
  return Math.random() * Math.PI * pow;
}

// Start animation loop.
const renderer = ref(null);
onMounted(() => {
  // Setup the animation loop.
  function animate(time) {
    TWEEN.update(time)
    requestAnimationFrame(animate);

    console.log('frame')
  }
  function morbinTime() {
    const tween = new TWEEN.Tween(dodecahedronRotation.value)
        .to({x: getRandomAngle(), y: getRandomAngle(), z: getRandomAngle()}, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        // .onUpdate(() => {
        //   // dodecahedron.value.rotation.set(dodecahedronRotation.value.x, dodecahedronRotation.value.y, dodecahedronRotation.value.z);
        // })
        .start();
    const tween2 = new TWEEN.Tween(icosahedronRotation.value)
        .to({x: getRandomAngle(1/4), y: getRandomAngle(1/4), z: getRandomAngle(1/4)}, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        // .onUpdate(() => {
        //   // icosahedron.value.rotation.set(icosahedronRotation.value.x, icosahedronRotation.value.y, icosahedronRotation.value.z);
        // })
        .start();
    setTimeout(() => {
      morbinTime()
    }, 1000);
  }
  morbinTime()
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