import { useState } from 'react'
import './App.css'
import SplitFlapDisplay from './components/SplitFlapDisplay'

function App() {
    const [message, setMessage] = useState<string>('')
    return (
        <div>
            <SplitFlapDisplay message={message} />
        </div>
    )
}

export default App
