import { FC, useState } from 'react'
import CharacterDisplay from './CharacterDisplay'

//prettier-ignore
const defaultInputValues = ['H','E','L','L','O',',',' ','T','H','I','S',' ','I','S',' ','A','T','E','S','T',' ','M','E','S','S','A','G','E', '!']

const SplitFlapDisplay: FC = () => {
    const [message, setMessage] = useState<string[]>([])
    const [inputValues, setInputValues] = useState<string[]>(defaultInputValues)
    const [inputCount, _] = useState<number>(48)

    const characterDisplays = [...Array(inputCount)].map((_, i) => (
        <CharacterDisplay
            key={`character-display-${i}`}
            character={message[i]}
        />
    ))

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        i: number
    ) => {
        if (e.key === 'Backspace') {
            //goin backwards

            setInputValues((prev) => {
                const value = ''
                const nextPrev = [...prev]
                nextPrev[i] = value.toUpperCase()
                return nextPrev
            })

            const previousInputElement: HTMLInputElement | null =
                document.querySelector(`.character-input-${i - 1}`) ||
                document.querySelector(`.character-input-${inputCount - 1}`)
            setTimeout(() => {
                previousInputElement?.select()
            }, 0)
        } else if (e.key.length === 1) {
            //goin forwards

            setInputValues((prev) => {
                const value = e.key
                const nextPrev = [...prev]
                nextPrev[i] = value.toUpperCase()
                return nextPrev
            })

            const nextInputElement: HTMLInputElement | null =
                document.querySelector(`.character-input-${i + 1}`) ||
                document.querySelector(`.character-input-0`)

            setTimeout(() => {
                nextInputElement?.select()
            }, 0)
        }
    }

    const characterInputs = [...Array(inputCount)].map((_, i) => (
        <div key={`character-input-${i}`}>
            <input
                className={`${`character-input-${i}`} p-1 md:p-3 text-center border-solid border-black border-2 rounded-lg font-mono text-sm md:text-2xl`}
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
                type="text"
                size={1}
                spellCheck={false}
                value={inputValues[i] || ''}
            />
        </div>
    ))

    return (
        <div className="inline-flex flex-col justify-center items-center w-full">
            <div>
                <div
                    className="inline-grid sm:gap-[2px] mb-8 md:mb-24 p-1 sm:p-6 md:p-12"
                    style={{
                        gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
                    }}
                >
                    {characterDisplays}
                </div>
            </div>
            <div>
                <form
                    className="inline-flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault()
                        setMessage(inputValues.map((val) => val || ' '))
                    }}
                >
                    <div className="flex flex-col justify-center items-center">
                        <button
                            className="flex mb-4 justify-center items-center font-mono gap-3 border-solid border-2 border-black py-4 px-12 rounded-md text-[18px] font-semibold active:translate-y-1 transition-all bg-white"
                            type="submit"
                        >
                            <span>SEND MESSAGE</span>
                            <div className="w-4">
                                <svg
                                    width="100%"
                                    height="100%"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    viewBox="0 0 24 24" // Add viewBox to ensure proper scaling
                                >
                                    <path
                                        stroke="black"
                                        strokeWidth="1"
                                        d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"
                                    />
                                </svg>
                            </div>
                        </button>
                        <div
                            className="inline-grid grid-col-12 gap-1"
                            style={{
                                gridTemplateColumns:
                                    'repeat(16, minmax(0, 1fr))',
                            }}
                        >
                            {characterInputs}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SplitFlapDisplay
