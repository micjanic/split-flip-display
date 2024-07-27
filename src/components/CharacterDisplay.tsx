import { FC, useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const flipAnimationSpeed: number = 1000

const flipAnimationBottom = keyframes`
  from {
    transform: rotateX(-180deg);
  }
  to {
    transform: rotateX(-360deg);
  }
`

const flipAnimationTop = keyframes`
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(-180deg);
  }
`

const FlapDisplay = css`
    position: absolute;
    background-color: aliceblue;
    top: 0;
    left: 0;
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
    ${FlapDisplay}
`

const FlapDisplayBottom = styled.div`
    z-index: 3;
    clip-path: inset(50% 0 0 0);
    animation: ${flipAnimationBottom};
    ${FlapDisplay}
`

const ClippedCardTop = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background-color: aliceblue;
    clip-path: inset(0 0 50% 0);
`

const ClippedCardBottom = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: aliceblue;
    clip-path: inset(50% 0 0 0);
`

const StaticDisplay = styled.div`
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface CharacterDisplayProps {
    character: string
}

const CharacterDisplay: FC<CharacterDisplayProps> = ({ character = ' ' }) => {
    const [curCharacter, setCurCharacter] = useState<string>('')
    const [prevCharacter, setPrevCharacter] = useState<string>(' ')
    const [characterCode, setCharacterCode] = useState<number>(26)

    const cycleCharacters = () => {
        const char = character?.toUpperCase()
        setCurCharacter(char)

        setTimeout(() => {
            setPrevCharacter(char)
        }, flipAnimationSpeed)
    }

    const flapCharacter = (
        <>
            <FlapDisplayTop>
                {prevCharacter === ' ' ? <>&nbsp;</> : prevCharacter}
            </FlapDisplayTop>
            <FlapDisplayBottom>
                {curCharacter === ' ' ? <>&nbsp;</> : curCharacter}
            </FlapDisplayBottom>
            <ClippedCardTop>
                {curCharacter === ' ' ? <>&nbsp;</> : curCharacter}
            </ClippedCardTop>
            <ClippedCardBottom>
                {prevCharacter === ' ' ? <>&nbsp;</> : prevCharacter}
            </ClippedCardBottom>
        </>
    )

    useEffect(() => {
        cycleCharacters()
    }, [character])

    return (
        <div
            className="inline-block relative font-mono font-bold text-3xl"
            style={{ perspective: '100px' }}
        >
            {curCharacter !== prevCharacter && flapCharacter}
            <StaticDisplay>
                {curCharacter === ' ' ? <>&nbsp;</> : curCharacter}
            </StaticDisplay>
        </div>
    )
}

export default CharacterDisplay
