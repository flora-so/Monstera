<script setup lang="ts">
import Component from "./components/input/Dropdown.vue";
import Button from "./components/button/SmallButton.vue";

import type { DropdownItem } from "./components/input";

function show(val: any) {
  console.log(val)
}

const items: DropdownItem[] = [
  {
    value: "1",
    label: "One"
  },
  {
    value: "2",
    label: "two"
  },
  {
    value: "3",
    label: "three"
  },
];
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div>
      <Component @change="val => show(val)" :items="items">
        <template #component>
          <Button label="Dropdown"></Button>
        </template>
      </Component>
      <Component @change="val => show(val)" :items="items">
        <template #component>
          <Button label="Dropdown"></Button>
        </template>
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