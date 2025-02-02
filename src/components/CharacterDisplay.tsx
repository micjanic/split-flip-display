import { FC, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const flipAnimationSpeed: number = 100
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
    border: 1px solid #000000;
    border-top: 1px solid #666666;
    border-bottom: 4px solid #000000;
    &::before {
        content: '';
        position: absolute;
        width: calc(100% - 4px);
        height: 50%;
        top: 1px;
        border-bottom: #1d1d1d 2px solid;
    }
    &::after {
        content: '';
        position: absolute;
        width: calc(100% - 4px);
        height: 50%;
        top: 2px;
        border-bottom: #ffffff49 1px solid;
    }

    ${backgroundColor}
`

const FlapAnimationStyles = css`
    position: absolute;
    top: 0;
    left: 0;
    transition: all;
    -webkit-transition: all; /* Safari and Chrome */
    -moz-transition: all; /* Firefox */
    -o-transition: all; /* Opera */
    -ms-transition: all;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards; /* Safari and Chrome */
    -moz-animation-fill-mode: forwards; /* Firefox */
    -o-animation-fill-mode: forwards; /* Opera */
    -ms-animation-fill-mode: forwards; /* Internet Explorer */
    animation-timing-function: linear;
    -webkit-animation-timing-function: linear; /* Safari and Chrome */
    -moz-animation-timing-function: linear; /* Firefox */
    -o-animation-timing-function: linear; /* Opera */
    -ms-animation-timing-function: linear; /* Internet Explorer */
    animation-duration: ${flipAnimationSpeed}ms;
    -webkit-animation-duration: ${flipAnimationSpeed}ms; /* Safari and Chrome */
    -moz-animation-duration: ${flipAnimationSpeed}ms; /* Firefox */
    -o-animation-duration: ${flipAnimationSpeed}ms; /* Opera */
    -ms-animation-duration: ${flipAnimationSpeed}ms; /* Internet Explorer */
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
    ',', '.', '\'','"',':', '?', '!', '+','-','/','=','$','%','(',')'
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
        // I need this to show a space, otherwise it gets trimmed by react or html.
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
            const nextCharListIndex: number =
                (charListIndex + 1) % charList.length
            const nextChar: string = charList[nextCharListIndex]

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
            className="inline-block relative font-mono font-thin md:font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl"
            style={{ perspective: '500px' }}
        >
            {curCharacter !== prevCharacter && flapCharacter}
            <StaticDisplay>{curChar}</StaticDisplay>
        </div>
    )
}

export default CharacterDisplay
