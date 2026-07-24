import { describe, expect, it } from 'vitest'
import { getTypewriterSteps, normalizeTypewriterTexts } from '../src/runtime/utils/typewriter'

describe('typewriter utilities', () => {
    it('normalizes a single text and removes empty texts', () => {
        expect(normalizeTypewriterTexts(['', 'Hello', ''])).toEqual(['Hello'])
        expect(normalizeTypewriterTexts('Hello')).toEqual(['Hello'])
    })

    it('creates one step per character', () => {
        expect(getTypewriterSteps('Hi', 'characters')).toEqual(['', 'H', 'Hi'])
    })

    it('creates one step per word', () => {
        expect(getTypewriterSteps('Hello world', 'words')).toEqual(['', 'Hello ', 'Hello world'])
    })

    it('keeps unicode characters together in character mode', () => {
        expect(getTypewriterSteps('A😊', 'characters')).toEqual(['', 'A', 'A😊'])
    })
})
