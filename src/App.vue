<script setup lang="ts">
import Button from "./components/button/BigButton.vue";
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen bg-black">
    <Button label="Hello" background-colour="primary" />This is so cool
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