export type TypewriterStyle = 'characters' | 'words'

export interface TypewriterProps {
    texts: string | string[]
    style?: TypewriterStyle
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    loop?: boolean
    cursor?: string
    showCursor?: boolean
}
