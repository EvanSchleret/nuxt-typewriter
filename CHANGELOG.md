# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog.

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
