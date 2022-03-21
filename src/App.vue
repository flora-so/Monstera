<script setup lang="ts">
import Component from "./components/content/OutlinedCard.vue";
import Button from "./components/button/SmallButton.vue";

function show(val: any) {
  console.log(val)
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div>
      <Component>
        <Button label="Dropdown"></Button>
      </Component>
    </div>
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