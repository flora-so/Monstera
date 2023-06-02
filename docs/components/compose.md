# Compose

## Monsetra App

### Import

```jsx
import { MonsetraApp } from "monsetra-vue/dist/compose";
```

### Usage

```html
<monsetra-app
  :theme="Theme.light"
  font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  primary="23,105,255"
  accent="131,72,255"
  success="62,238,145"
  warning="255,192,0"
  danger="255,89,89"
></monsetra-app>
```

### Parameters

### `theme`

* Type: `String` as `Theme`
* Default: `Theme.light`

Sets the theme of the application

### `font-family`

* Type: `String`
* Default: `"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"`

Sets the font family of the application

### `primary`

* Type: `String`
* Default: `"23,105,255"`

Sets the primary colour of the application

### `accent`

* Type: `String`
* Default: `"131,72,255"`

Sets the accent colour of the application

### `success`

* Type: `String`
* Default: `"62,238,145"`

Sets the success colour of the application

### `warning`

* Type: `String`
* Default: `"255,192,0"`

Sets the warning colour of the application

### `danger`

* Type: `String`
* Default: `"255,89,89"`

Sets the danger colour of the application

### Slots

### `default`

* Insert the whole application in this slot
* **Implementation**
  ```html
  <monsetra-app>
  	...
  </monsetra-app>
  ```

## Monsetra Form

### Import

```jsx
import { MonsetraForm } from "monsetra-vue/dist/compose";
```

### Usage

```html
<monsetra-form
  :action="submitForm()"
></monsetra-form>
```

### Parameters

### `action`

* Type: `Function`
* **Required**

Sets the action of the form

### Slots

### `default`

* Insert the form in this slot
* **Implementation**
  ```html
  <monsetra-form>
  	...
  </monsetra-form>
  ```
