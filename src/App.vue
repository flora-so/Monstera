<script setup lang="ts">
import type { InformativeContext } from "./types";
import Component from "./components/informative/Banner.vue";
import Button from "./components/button/IconButton.vue";

function show(val: any) {
  console.log(val)
}
let context: InformativeContext;
// const df = new DataFrame(
//   ["Id", "Name", "Age"],
//   [
//     {
//       Id: 1,
//       Name: "John",
//       Age: 20,
//     },
//     {
//       Id: 2,
//       Name: "Jane",
//       Age: 21,
//     }
//   ]
// )
</script>

<template>
  <div>
    <Component content="This is a alert dialog" @context="ctx => context = ctx">
      <template #actions>
        <Button label="Cancel"></Button>
        <Button label="Ok"></Button>
      </template>
    </Component>
    <Button @click="() => context.show()">
      <template #icon="{ width, height, colour }">
        <svg
          :width="width"
          :height="height"
          :fill="colour"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
    </Button>
  </div>
</template>

<style>
@import "./styles/reset.css";

:root {
  --primary: 23, 105, 255;
  --accent: 131, 72, 255;
  --success: 62, 238, 145;
  --warning: 255, 192, 0;
  --danger: 255, 89, 89;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>