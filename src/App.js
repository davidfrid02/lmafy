import React, { useState } from 'react'
import './App.css'
import ChatGPTComponent from './components/chatGPTComponent/chatGPTComponent'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState('')

    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(param)
    }

    const queryFromUrl = getQueryParam('q')

    if (queryFromUrl) {
        return <ChatGPTComponent query={queryFromUrl} />
    }

    const generateLink = () => {
        const query = inputValue.trim()
        if (query) {
            const encodedQuery = encodeURIComponent(query)
            const currentUrl = window.location.href.split('?')[0]
            const link = `${currentUrl}?q=${encodedQuery}`
            setResult(
                `Here's your link:<br /><a href="${link}" target="_blank">${link}</a>`
            )
        } else {
            setResult('Please enter a question first!')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            generateLink()
        }
    }

    return (
        <div className="wrapper">
            <div className="header">
                <h2>Let Me ChatGPT that For You</h2>
            </div>
            <div className="chat-area">
                <textarea
                    id="userInput"
                    placeholder="Type your question here..."
                    rows="4"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button id="generateBtn" onClick={generateLink}>
                    Generate Link
                </button>
                <div id="result" dangerouslySetInnerHTML={{ __html: result }} />
            </div>
        </div>
    )
}

export default App
