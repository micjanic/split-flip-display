import { FC, useMemo } from 'react'
import CharacterDisplay from './CharacterDisplay'

interface SplitFlapDisplayProps {
    message: string
}

const SplitFlapDisplay: FC<SplitFlapDisplayProps> = ({ message }) => {
    const character = useMemo(() => message[0], [message])
    return <CharacterDisplay character={character} />
}

export default SplitFlapDisplay
