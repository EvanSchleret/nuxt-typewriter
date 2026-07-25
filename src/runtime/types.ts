export type TypewriterStyle = 'characters' | 'words'
export type TypewriterBlinkWhen = 'always' | 'end'

export interface TypewriterBlinkOptions {
    enabled?: boolean
    when?: TypewriterBlinkWhen
}

export interface TypewriterProps {
    texts: string | string[]
    style?: TypewriterStyle
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    loop?: boolean
    cursor?: string
    showCursor?: boolean
    blinkCursor?: TypewriterBlinkOptions
}
