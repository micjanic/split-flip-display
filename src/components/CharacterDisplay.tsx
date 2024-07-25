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
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    animation: ${flipAnimation} 0.4s linear;
    animation-fill-mode: forwards;
`

const FlipCardSide = styled.div`
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: aliceblue;
    padding: 16px;
    clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
`

interface CharacterDisplayProps {
    character: string
}

const CharacterDisplay: FC<CharacterDisplayProps> = ({ character }) => {
    return (
        <FlipCard className="m-16 overflow-hidden font-mono p-2 font-bold text-5xl">
            <FlipCardInner>
                <FlipCardSide>{character}</FlipCardSide>
            </FlipCardInner>
        </FlipCard>
    )
}

export default CharacterDisplay
