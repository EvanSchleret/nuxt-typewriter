// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import tailwind from 'eslint-plugin-tailwindcss'

export default withNuxt(
    tailwind.configs.recommended,
    {
        settings: {
            tailwindcss: {
                cssConfigPath: './app/assets/css/main.css'
            }
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            'vue/html-indent': ['error', 4],
            '@typescript-eslint/no-explicit-any': 'off',
            'tailwindcss/no-custom-classname': 'off',
            'no-explicit-any': 'off'
        }
    }
)
