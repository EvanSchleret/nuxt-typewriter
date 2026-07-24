import type { TypewriterStyle } from '../types'

export function normalizeTypewriterTexts(texts: string | readonly string[]): string[] {
    return (Array.isArray(texts) ? texts : [texts]).filter(text => text.length > 0)
}

export function getTypewriterSteps(text: string, style: TypewriterStyle): string[] {
    if (text.length === 0) {
        return ['']
    }

    if (style === 'words') {
        const steps = ['']
        const wordPattern = /\S+\s*/g
        let match: RegExpExecArray | null
        while ((match = wordPattern.exec(text)) !== null) {
            const end = match.index + match[0].length
            steps.push(text.slice(0, end))
        }

        if (steps.at(-1) !== text) {
            steps.push(text)
        }

        return steps
    }

    const steps = ['']
    let current = ''

    for (const character of Array.from(text)) {
        current += character
        steps.push(current)
    }

    return steps
}
