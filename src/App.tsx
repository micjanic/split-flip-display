import { useState } from 'react'
import './App.css'
import SplitFlapDisplay from './components/SplitFlapDisplay'

function App() {
    const [message, setMessage] = useState<string>('')
    return (
        <div>
            <SplitFlapDisplay message={message} />
            <input
                maxLength={1}
                onInput={({ target }) => {
                    setMessage(target.value)
                }}
                value={message}
                type="text"
                placeholder="Send Message..."
            />
        </div>
    )
}

export default App
