// @ts-expect-error not sure how to fix TS2304 here
export default defineNuxtConfig({
    modules: ['@nuxt/eslint'],

    compatibilityDate: '2026-07-25',

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs'
            }
        }
    }
})
