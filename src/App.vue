<script setup lang="ts">
import Component from "./components/input/Chips.vue";

function show(val: any) {
  console.log(val)
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <Component group="chip" label="chip 1" multiselect @selected="val => show(val)" />
    <Component group="chip" label="chip 2" multiselect @selected="val => show(val)" />
    <Component group="chip" label="chip 3" multiselect @selected="val => show(val)" />
    <Component group="chip" label="chip 4" multiselect @selected="val => show(val)" />
  </div>
</template>

<style>
:root {
  --primary: 23, 105, 255;
  --accent: 131, 72, 255;
  --success: 62, 238, 145;
  --warning: 255, 192, 0;
  --danger: 255, 89, 89;
}
</style>