import { FC } from 'react'
import styled, { keyframes } from 'styled-components'

const flipAnimation = keyframes`
  from {
    transform: rotateX(-180deg);
  }
  to {
    transform: rotateX(-360deg);
  }
`

const FlipCard = styled.div`
    perspective: 400px;
`

const FlipCardInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const FlipCardTop = styled.div`
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: aliceblue;
    padding: 16px;
    clip-path: inset(0 0 50% 0);
    transform-style: preserve-3d;
    animation: ${flipAnimation} 0.4s linear;
    animation-fill-mode: forwards;
    animation-direction: reverse;
`

const FlipCardBottom = styled.div`
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: aliceblue;
    padding: 16px;
    clip-path: inset(50% 0 0 0);
    transform-style: preserve-3d;
    animation: ${flipAnimation} 0.4s linear;
    animation-fill-mode: forwards;
`

interface CharacterDisplayProps {
    character: string
}

const CharacterDisplay: FC<CharacterDisplayProps> = ({ character }) => {
    return (
        <FlipCard className="m-16 overflow-hidden font-mono p-2 font-bold text-5xl">
            <FlipCardInner>
                <FlipCardTop>{character}</FlipCardTop>
                <FlipCardBottom>{character}</FlipCardBottom>
            </FlipCardInner>
        </FlipCard>
    )
}

export default CharacterDisplay
