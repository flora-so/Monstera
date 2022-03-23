<script setup lang="ts">
import type { InformativeContext } from "./components/informative";
import Component from "./components/informative/AlertDialog.vue";
import Button from "./components/button/TextButton.vue";

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
  <Component content="This is a alert dialog" @context="ctx => context = ctx">
    <template #actions>
      <Button label="Cancel"></Button>
      <Button label="Ok"></Button>
    </template>
  </Component>
  <div class="flex justify-center items-center w-screen h-screen">
    <div>
      <Button label="Show" @click="() => context.show()"></Button>

      <!-- <Component :dataframe="df">
        <template #Age="{ data }">
        </template>
      </Component>-->
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