# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog.

## v1.1.1 - 2026-07-25

### v1.1.1

#### ✨ Highlights

##### ▶️ Always-on Typewriter animation

The Typewriter no longer stops when the user's system enables reduced-motion preferences. Typing and deleting now always run, ensuring the component remains functional in every configuration.

#### 🚀 Features

- **Typewriter**: Remove `prefers-reduced-motion` handling so typing, deleting, and cursor blinking always animate (`c70b57a`)

#### ❤️ Contributors

- @EvanSchleret

**Full Changelog**: https://github.com/EvanSchleret/nuxt-typewriter/compare/v1.1.0...v1.1.1

## v1.1.0 - 2026-07-25

### v1.1.0

#### ✨ Highlights

##### ✨ Configurable blinking cursor

The Typewriter cursor can now blink continuously or only after the current text has finished typing.

```vue
<Typewriter
  :texts="['Nuxt Typewriter', 'Hello world']"
  :blink-cursor="{ when: 'end' }"
/>


```
##### 🎛️ Fine-grained cursor control

Use the `blinkCursor` object to enable or disable blinking and choose when it should occur.

```vue
<Typewriter :blink-cursor="{ enabled: false }" />
<Typewriter :blink-cursor="{ enabled: true, when: 'always' }" />
<Typewriter :blink-cursor="{ enabled: true, when: 'end' }" />


```
#### 🚀 Features

- **Typewriter**: Add configurable cursor blinking with `always` and `end` modes, while preserving reduced-motion support (`44c446e`)

#### ❤️ Contributors

- @EvanSchleret

**Full Changelog**: https://github.com/EvanSchleret/nuxt-typewriter/compare/v1.0.0...v1.1.0

## v1.0.0 - 2026-07-24

### ✨ Highlights

#### ⌨️ Animated Typewriter component

`@evanschleret/nuxt-typewriter` adds an auto-registered `<Typewriter>` component for Nuxt applications.

```vue
<Typewriter
  :texts="['Hello world', 'Welcome']"
  style="characters"
  :typing-speed="80"
  :deleting-speed="40"
/>



```
#### 🎛️ Character and word typing modes

Choose between character-by-character or word-by-word animation, with configurable speed, pauses, looping, cursor content, and cursor visibility.

#### ♿ SSR-safe and motion-aware runtime

The component provides stable SSR output, handles Unicode characters correctly, cleans up timers on unmount, and respects `prefers-reduced-motion`.

### 🚀 Features

- **Typewriter**: Add the Nuxt module and animated `<Typewriter>` component with character and word modes (`98ec1ff`)

### ❤️ Contributors

- @EvanSchleret

**Full Changelog**: https://github.com/EvanSchleret/nuxt-typewriter/commits/v1.0.0

## Unreleased
