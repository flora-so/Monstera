# Monsetra UI

Monsetra UI is a Vue 3 components library designed and developed based on the Monsetra Design principles.

## Install

```sh
npm install monsetra-vue
```

## Usage

### As Components

```js
import { <Component> } from "monsetra-vue/dist/components/<Component Group>";
...
components: {
  <Component>
}
```

### As Plugin

```js
import { createApp } from 'vue'
import { <Component> } from "monsetra-vue/dist/components/<Component Group>";

createApp.use(<Component>)
```

# Introduction

Monsetra UI is split into 4 main component groups: button, content, informative and inputs.

## Buttons

This component group contains a total of 5 button variation: Big, Small, Outlined, Link and Text.

## Content

This component group contains components that holds _content_. Hence, the component group name content. These components help to give content a better look, so think containers and tables.

## Informative

This component group contains more informative elements that helps _inform_ users. This can be anything from warnings or purely to notify users.

## Input

This component group contains all components that helps input values. This can be from form inputs to getting inputs for settings.
