<script setup lang="ts">
// import { DataFrame } from "./components/content";
import Component from "./components/informative/LinearLoader.vue";
// import Checkbox from "./components/input/Checkbox.vue";

function show(val: any) {
  console.log(val)
}

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
  <div class="flex justify-center items-center w-screen h-screen">
    <div>
      <Component :dataframe="df" checkbox />
      <!-- <Component :dataframe="df">
        <template #Age="{ data }">
          <Button :label="data.toString()"></Button>
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