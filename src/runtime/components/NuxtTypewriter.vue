<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { TypewriterProps } from '../types'
import { getTypewriterSteps, normalizeTypewriterTexts } from '../utils/typewriter'

const props = withDefaults(defineProps<TypewriterProps>(), {
    style: 'characters',
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 1500,
    loop: true,
    cursor: '|',
    showCursor: true
})

const texts = computed(() => normalizeTypewriterTexts(props.texts))
const blinkOptions = computed(() => ({
    enabled: props.blinkCursor?.enabled ?? true,
    when: props.blinkCursor?.when ?? 'always'
}))
const displayedText = ref(texts.value[0] ?? '')
const prefersReducedMotion = ref(false)
const cursorVisible = ref(true)
let timer: ReturnType<typeof setTimeout> | undefined
let blinkTimer: ReturnType<typeof setInterval> | undefined
let mediaQuery: MediaQueryList | undefined
let reducedMotionListener: ((event: MediaQueryListEvent) => void) | undefined
let textIndex = 0
let stepIndex = 0
let phase: 'typing' | 'pause' | 'deleting' = 'typing'

function clearTimer(): void {
    if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
    }
}

function schedule(callback: () => void, delay: number): void {
    clearTimer()
    timer = setTimeout(callback, Math.max(0, delay))
}

function stop(): void {
    clearTimer()
}

function stopBlinking(): void {
    if (blinkTimer !== undefined) {
        clearInterval(blinkTimer)
        blinkTimer = undefined
    }

    cursorVisible.value = true
}

function syncBlinking(): void {
    stopBlinking()

    if (
        !blinkOptions.value.enabled
        || texts.value.length === 0
        || prefersReducedMotion.value
        || (blinkOptions.value.when === 'end' && phase !== 'pause')
    ) {
        return
    }

    blinkTimer = setInterval(() => {
        cursorVisible.value = !cursorVisible.value
    }, 500)
}

function run(): void {
    const currentText = texts.value[textIndex]

    if (currentText === undefined) {
        stop()
        return
    }

    const steps = getTypewriterSteps(currentText, props.style)

    if (phase === 'typing') {
        if (stepIndex < steps.length - 1) {
            stepIndex += 1
            displayedText.value = steps[stepIndex] ?? currentText
            schedule(run, props.typingSpeed)
            return
        }

        phase = 'pause'
        syncBlinking()
        schedule(run, props.pauseDuration)
        return
    }

    if (phase === 'pause') {
        if (!props.loop && textIndex === texts.value.length - 1) {
            stop()
            return
        }

        phase = 'deleting'
        syncBlinking()
        schedule(run, props.deletingSpeed)
        return
    }

    if (stepIndex > 0) {
        stepIndex -= 1
        displayedText.value = steps[stepIndex] ?? ''
        schedule(run, props.deletingSpeed)
        return
    }

    textIndex = (textIndex + 1) % texts.value.length
    stepIndex = 0
    phase = 'typing'
    syncBlinking()
    schedule(run, props.typingSpeed)
}

function restart(): void {
    stop()
    textIndex = 0
    stepIndex = 0
    phase = 'typing'
    displayedText.value = texts.value[0] ?? ''
    syncBlinking()

    if (texts.value.length === 0 || prefersReducedMotion.value) {
        return
    }

    displayedText.value = ''
    schedule(run, 0)
}

onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    reducedMotionListener = (event) => {
        prefersReducedMotion.value = event.matches
        restart()
        syncBlinking()
    }
    mediaQuery.addEventListener('change', reducedMotionListener)
    restart()
    syncBlinking()
})

watch(() => [props.texts, props.style], restart, { deep: true })
watch(() => props.blinkCursor, syncBlinking, { deep: true })

onBeforeUnmount(() => {
    stop()
    stopBlinking()

    if (mediaQuery !== undefined && reducedMotionListener !== undefined) {
        mediaQuery.removeEventListener('change', reducedMotionListener)
    }
})
</script>

<template>
    <span
        class="typewriter"
        aria-live="polite"
    >
        <span>{{ displayedText }}</span>
        <span
            v-if="showCursor"
            class="typewriter__cursor"
            :style="{ opacity: cursorVisible ? 1 : 0 }"
            aria-hidden="true"
        >{{ cursor }}</span>
    </span>
</template>
