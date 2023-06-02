# Getting Started

## Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Vue JS](https://vuejs.org/guide/introduction.html)

## Installation

* **Step 1:** Go to your Vue project folder

  ```sh
  cd vue-project-folder
  ```
* **Step 2:** Install Monsetra UI

  ```sh
  npm install monsetra-vue
  ```

## Usage

There are two ways to use the Monstera Vue library. You can use it either as components or as plugins.

::: tip Note

For now, the guide will use the library as components.

:::

### Components

When using the library as components, under the `<script>` block in a Vue file, you can import the components as shown below.

```js
import {
  <ComponentOne>,
  <ComponentTwo>
} from "monsetra-vue/dist/<component-group>";
...
components: {
  <ComponentOne>,
  <ComponentTwo>
}
```

### Plugin

When using the library as plugins, you can use it like the following.

```js
import { createApp } from 'vue'
import { <Component> } from "monsetra-vue/dist/<component-group>";
createApp.use(<Component>)
```

## Overview

Monsetra UI is split into 5 main component groups:

* Button
* Input
* Content
* Informative
* Compose

### Button

This component group contains a total of 5 button variation: Big, Small, Outlined, Link and Text.

### Input

This component group contains all components that helps input values. This can be from form inputs to getting inputs for settings.

### Content

This component group contains components that holds _content_. Hence, the component group name content. These components help to give content a better look, so think containers and tables.

### Informative

This component group contains more informative elements that helps _inform_ users. This can be anything from warnings or purely to notify users.

### Compose

This component group contains components that controls the overall look and functionality of the app.
