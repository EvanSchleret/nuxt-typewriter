import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
    autoImport?: boolean
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: '@evanschleret/nuxt-typewriter',
        configKey: 'typewriter',
        compatibility: {
            nuxt: '>=3.0.0'
        }
    },
    defaults: {
        autoImport: true
    },
    setup(options) {
        const resolver = createResolver(import.meta.url)

        if (!options.autoImport) {
            return
        }

        addComponent({
            name: 'Typewriter',
            filePath: resolver.resolve('./runtime/components/NuxtTypewriter.vue')
        })
    }
})
