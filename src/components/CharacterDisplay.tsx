import { FC, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const flipAnimationSpeed: number = 120
const backgroundColor = css`
    background-image: linear-gradient(#18181a, #3c3d41);
`

const flipAnimationBottom = keyframes`
  from {
    transform: rotateX(-180deg);
    background-image: linear-gradient(#18181a, #3c3d41);
  }
  to {
    transform: rotateX(-360deg);
    background-image: linear-gradient(#ffffff, #252629);
  }
`

const flipAnimationTop = keyframes`
  from {
    transform: rotateX(0deg);
    ${backgroundColor}
  }
  to {
    transform: rotateX(-180deg);
    background-color: #ffffff;
  }
`

const FlapStyles = css`
    color: #ffffff;
    padding: 12px 4px;
    border-radius: 4px;
    border: 1px solid #344663;
    border-top: 1px solid white;
    border-bottom: 1px solid #000000;
    &::before {
        content: '';
        position: absolute;
        width: calc(100% - 8px);
        height: 50%;
        top: 1px;
        border-bottom: #1d1d1d 2px solid;
    }
    &::after {
        content: '';
        position: absolute;
        width: calc(100% - 8px);
        height: 50%;
        top: 2px;
        border-bottom: #ffffff 1px solid;
    }

    ${backgroundColor}
`

const FlapAnimationStyles = css`
    position: absolute;
    top: 0;
    left: 0;
    transition: all;
    transform-style: preserve-3d;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-duration: ${flipAnimationSpeed}ms;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FlapDisplayTop = styled.div`
    z-index: 4;
    clip-path: inset(0 0 50% 0);
    animation: ${flipAnimationTop};
    ${FlapAnimationStyles}
    ${FlapStyles}
`
const FlapDisplayBottom = styled.div`
    z-index: 3;
    clip-path: inset(50% 0 0 0);
    animation: ${flipAnimationBottom};
    ${FlapAnimationStyles}
    ${FlapStyles}
`
const ClippedCardTop = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    clip-path: inset(0 0 50% 0);
    ${FlapStyles}
`
const ClippedCardBottom = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    clip-path: inset(50% 0 0 0);
    ${FlapStyles}
`
const StaticDisplay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${FlapStyles}
`
//prettier-ignore
const charList:string[] = [
    ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '.', ',', ':', "'", '"', '?', '!', '@', '#', '$', '&', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\', '/', '*'
  ]

interface CharacterDisplayProps {
    character: string
}

const CharacterDisplay: FC<CharacterDisplayProps> = ({ character = ' ' }) => {
    const [curCharacter, setCurCharacter] = useState<string>(' ')
    const [prevCharacter, setPrevCharacter] = useState<string>(' ')
    const [charListIndex, setCharListIndex] = useState<number>(0)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const prevChar = useMemo(
        () => (prevCharacter === ' ' ? <>&nbsp;</> : prevCharacter),
        [prevCharacter]
    )

    const curChar = useMemo(
        () => (curCharacter === ' ' ? <>&nbsp;</> : curCharacter),
        [curCharacter]
    )

    const flapCharacter = (
        <>
            <FlapDisplayTop>{prevChar}</FlapDisplayTop>
            <FlapDisplayBottom>{curChar}</FlapDisplayBottom>
            <ClippedCardTop>{curChar}</ClippedCardTop>
            <ClippedCardBottom>{prevChar}</ClippedCardBottom>
        </>
    )

    useEffect(() => {
        if (
            timeoutRef.current == null &&
            charList[charListIndex] !== character.toUpperCase()
        ) {
            const nextCharListIndex = (charListIndex + 1) % charList.length
            const nextChar = charList[nextCharListIndex]

            setCurCharacter(nextChar)

            timeoutRef.current = setTimeout(() => {
                setCharListIndex(nextCharListIndex)
                setPrevCharacter(nextChar)

                if (timeoutRef.current) {
                    timeoutRef.current = null
                }
            }, flipAnimationSpeed)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [character, charListIndex])

    return (
        <div
            className="inline-block relative font-mono md:font-bold text-4xl sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ perspective: '500px' }}
        >
            {curCharacter !== prevCharacter && flapCharacter}
            <StaticDisplay>{curChar}</StaticDisplay>
        </div>
    )
}

export default CharacterDisplay
