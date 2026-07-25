import TypewriterModule from '../src/module'

// @ts-expect-error not sure how to fix TS2304 here
export default defineNuxtConfig({
    modules: [TypewriterModule],
    devtools: { enabled: true }
})
