import { useState } from 'react'
import './App.css'
import SplitFlapDisplay from './components/SplitFlapDisplay'

function App() {
    const [message, setMessage] = useState<string>('')
    return (
        <div>
            <SplitFlapDisplay message={message} />
            <input
                className="py-2 text-center border-solid border-black border-2 rounded-lg"
                maxLength={1}
                onInput={({ target }) => {
                    setMessage(target?.value?.toUpperCase())
                }}
                value={message}
                type="text"
                size={1}
                spellCheck={false}
            />
        </div>
    )
}

export default App
