import { FC } from 'react'
import CharacterDisplay from './CharacterDisplay'

interface SplitFlapDisplayProps {
    message: string
}

const SplitFlapDisplay: FC<SplitFlapDisplayProps> = ({ message }) => {
    const letter = message.charAt(0)
    return (
        <div className="inline-flex">
            <CharacterDisplay character={letter} />
        </div>
    )
}

export default SplitFlapDisplay
