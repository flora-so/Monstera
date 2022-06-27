# Button

## Big Button

### Import

```jsx
import { BigButton } from "monsetra-vue/dist/button";
```

### Usage

```html
<big-button
  label="Big button"
  colour="#ffffff"
  :background-colour="Colours.primary"
  :ignore="false"
  :disabled="false"
></big-button>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the button

### `colour`

* Type: `String` (hex code)
* Default: `#ffffff`

Sets the colour of the label of the button

### `background-colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the background colour of the button

### `ignore`

* Type: `Boolean`
* Default: `false`

Setting to `true` will make the button slightly translucent (indicating no interaction can be done)

### `disabled`

* Type: `Boolean`
* Default: `false`

Setting to `true` will completely grey out the button (indicating on interaction can be done)

### Slots

### `#leading`

* Places an icon to the left of the label
* **SVG Implementation**
  ```html
  <template #leading="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #leading="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### `#trailing`

* Places an icon to the right of the label
* **SVG Implementation**
  ```html
  <template #trailing="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #trailing="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

* All button emits are supported such as `@click`.

## Small Button

### Import

```jsx
import { SmallButton } from "monsetra-vue/dist/button";
```

### Usage

```html
<small-button
  label="Small button"
  colour="#ffffff"
  :background-colour="Colours.primary"
  :ignore="false"
  :disabled="false"
></small-button>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the button.

### `colour`

* Type: `String` (hex code)
* Default: `#ffffff`

Sets the colour of the label of the button

### `background-colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the background colour of the button

### `ignore`

* Type: `Boolean`
* Default: `false`

Setting to `true` will make the button slightly translucent (indicating no interaction can be done)

### `disabled`

* Type: `Boolean`
* Default: `false`

Setting to `true` will completely grey out the button (indicating on interaction can be done)

### Slots

### `#leading`

* Places an icon to the left of the label
* **SVG Implementation**
  ```html
  <template #leading="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #leading="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### `#trailing`

* Places an icon to the right of the label
* **SVG Implementation**
  ```html
  <template #trailing="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #trailing="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

* All button emits are supported such as `@click`.

## Text Button

### Import

```jsx
import { TextButton } from "monsetra-vue/dist/button";
```

### Usage

```html
<text-button
  label="Text button"
  :colour="Colours.primary"
  :ignore="false"
  :disabled="false"
></text-button>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the button.

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the label of the button

### `ignore`

* Type: `Boolean`
* Default: `false`

Setting to `true` will make the button slightly translucent (indicating no interaction can be done)

### `disabled`

* Type: `Boolean`
* Default: `false`

Setting to `true` will completely grey out the button (indicating on interaction can be done)

### Slots

### `#leading`

* Places an icon to the left of the label
* **SVG Implementation**
  ```html
  <template #leading="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #leading="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### `#trailing`

* Places an icon to the right of the label
* **SVG Implementation**
  ```html
  <template #trailing="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #trailing="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

* All button emits are supported such as `@click`.

## Link Button

### Import

```jsx
import { LinkButton } from "monsetra-vue/dist/button";
```

### Usage

```html
<text-button
  label="Link button"
  :colour="Colours.primary"
  href="<https://example.com>"
  :ignore="false"
  :disabled="false"
></text-button>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the button.

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the label of the button

### `href`

* Type: `String`
* **Optional**

Sets the link destination

### `ignore`

* Type: `Boolean`
* Default: `false`

Setting to `true` will make the button slightly translucent (indicating no interaction can be done)

### `disabled`

* Type: `Boolean`
* Default: `false`

Setting to `true` will completely grey out the button (indicating on interaction can be done)

### Emits

* All button emits are supported such as `@click`.

## Outlined Button

### Import

```jsx
import { OutlinedButton } from "monsetra-vue/dist/button";
```

### Usage

```html
<outlined-button
  label="Outlined button"
  :colour="Colours.primary"
  :ignore="false"
  :disabled="false"
></outlined-button>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the button.

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the label of the button

### `ignore`

* Type: `Boolean`
* Default: `false`

Setting to `true` will make the button slightly translucent (indicating no interaction can be done)

### `disabled`

* Type: `Boolean`
* Default: `false`

Setting to `true` will completely grey out the button (indicating on interaction can be done)

### Slots

### `#leading`

* Places an icon to the left of the label
* **SVG Implementation**
  ```html
  <template #leading="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #leading="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### `#trailing`

* Places an icon to the right of the label
* **SVG Implementation**
  ```html
  <template #trailing="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #trailing="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

* All button emits are supported such as `@click`.

## Icon Button

### Import

```jsx
import { IconButton } from "monsetra-vue/dist/button";
```

### Usage

```html
<icon-button
  :colour="Colours.primary"
  :filled="false"
></icon-button>
```

### Parameters

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the button

### `filled`

* Type: `Boolean`
* Default: `false`

Sets if the icon button has a background colour

### Slots

### `#icon`

* Determines the icon of the button
* **SVG Implementation**
  ```html
  <template #icon="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #icon="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

* All button emits are supported such as `@click`.
