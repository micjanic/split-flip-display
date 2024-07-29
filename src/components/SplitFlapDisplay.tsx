import { FC, useMemo, useState } from 'react'
import CharacterDisplay from './CharacterDisplay'

const SplitFlapDisplay: FC = () => {
    const [message, setMessage] = useState<string[]>([])
    const [inputValues, setInputValues] = useState<string[]>([])
    const [inputCount, setInputCount] = useState<number>(10)

    const characterDisplays = [...Array(inputCount)].map((_, i) => (
        <CharacterDisplay
            key={`character-display-${i}-${message[i]}`}
            character={message[i]}
        />
    ))

    const handleKeyDown = (e, i) => {
        if (e.key === 'Backspace') {
            setInputValues((prev) => {
                const value = ''
                const nextPrev = [...prev]
                nextPrev[i] = value.toUpperCase()
                return nextPrev
            })

            const previousInputElement: HTMLInputElement | null =
                document.querySelector(`.character-input-${i - 1}`)
            if (previousInputElement) previousInputElement?.focus()
        } else if (e.key.length === 1) {
            setInputValues((prev) => {
                const value = e.key
                const nextPrev = [...prev]
                nextPrev[i] = value.toUpperCase()
                return nextPrev
            })

            const nextInputElement: HTMLInputElement | null =
                document.querySelector(`.character-input-${i + 1}`)
            if (nextInputElement) nextInputElement?.focus()
        }
    }

    const characterInputs = [...Array(inputCount)].map((_, i) => (
        <div key={`character-input-${i}`}>
            <input
                className={`${`character-input-${i}`} py-2 text-center border-solid border-black border-2 rounded-lg`}
                maxLength={1}
                onFocus={({ target }) => {
                    target.select()
                }}
                onChange={(e) => {
                    e.preventDefault()
                }}
                onKeyDown={(event) => {
                    handleKeyDown(event, i)
                }}
                // onKeyDown={({ target }) => {
                //     if ((target as HTMLInputElement).value === '') {
                //         const previousInputElement: HTMLInputElement | null =
                //             document.querySelector(`.character-input-${i - 1}`)
                //         if (previousInputElement) previousInputElement?.focus()
                //     }
                // }}
                // onInput={(e) => {
                //     const value = (e.target as HTMLInputElement).value

                //     setInputValues((prev) => {
                //         const nextPrev = [...prev]
                //         nextPrev[i] = value.toUpperCase()
                //         return nextPrev
                //     })
                // }}
                type="text"
                size={1}
                spellCheck={false}
                value={inputValues[i] || ''}
            />
        </div>
    ))

    return (
        <div>
            {characterDisplays}
            <form
                className="inline-flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault()
                    setMessage(inputValues.map((val) => val || ' '))
                }}
            >
                <button
                    className="flex mb-4 justify-center items-center font-mono gap-3 border-solid border-2 border-black p-2 rounded-md"
                    type="submit"
                >
                    <span>Send Message</span>
                    <div className="w-4">
                        <svg
                            width="100%"
                            height="100%"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            viewBox="0 0 24 24" // Add viewBox to ensure proper scaling
                        >
                            <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
                        </svg>
                    </div>
                </button>
                <div className="flex gap-1">{characterInputs}</div>
            </form>
        </div>
    )
}

export default SplitFlapDisplay
