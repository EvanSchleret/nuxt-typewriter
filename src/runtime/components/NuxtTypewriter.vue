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
const displayedText = ref(texts.value[0] ?? '')
const prefersReducedMotion = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
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
        schedule(run, props.pauseDuration)
        return
    }

    if (phase === 'pause') {
        if (!props.loop && textIndex === texts.value.length - 1) {
            stop()
            return
        }

        phase = 'deleting'
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
    schedule(run, props.typingSpeed)
}

function restart(): void {
    stop()
    textIndex = 0
    stepIndex = 0
    phase = 'typing'
    displayedText.value = texts.value[0] ?? ''

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
    }
    mediaQuery.addEventListener('change', reducedMotionListener)
    restart()
})

watch(() => [props.texts, props.style], restart, { deep: true })

onBeforeUnmount(() => {
    stop()

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
            aria-hidden="true"
        >{{ cursor }}</span>
    </span>
</template>
