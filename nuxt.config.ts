export default defineNuxtConfig({
    modules: ['@nuxt/eslint'],
    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs'
            }
        }
    }
})
