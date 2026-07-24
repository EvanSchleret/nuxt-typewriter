# nuxt-typewriter

Nuxt module providing an animated Typewriter component for typed text.

## Installation

```bash
bun add @evanschleret/nuxt-typewriter
```

Add the module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@evanschleret/nuxt-typewriter']
})
```

## Usage

```vue
<template>
  <Typewriter
    :texts="['Hello world', 'Welcome']"
    style="characters"
    :typing-speed="80"
    :deleting-speed="40"
    :pause-duration="1500"
  />
</template>
```

Set `style` to `characters` to reveal text one character at a time, or to
`words` to reveal one word at a time.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `texts` | `string \| string[]` | — | Text or texts to animate |
| `style` | `characters \| words` | `characters` | Typing granularity |
| `typingSpeed` | `number` | `80` | Delay between typing steps in milliseconds |
| `deletingSpeed` | `number` | `40` | Delay between deleting steps in milliseconds |
| `pauseDuration` | `number` | `1500` | Pause after a complete text in milliseconds |
| `loop` | `boolean` | `true` | Whether to continue cycling through texts |
| `cursor` | `string` | `\|` | Cursor content |
| `showCursor` | `boolean` | `true` | Whether to display the cursor |

## Status

This package is under active development.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup and contribution guidelines.

## Security

Please report vulnerabilities through [GitHub Private Vulnerability Reporting](https://github.com/EvanSchleret/nuxt-typewriter/security/advisories/new).
