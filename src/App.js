import React, { useState } from 'react'
import './App.css'
import ChatGPTComponent from './components/chatGPTComponent/chatGPTComponent'
import StructuredData from './components/SEO/StructuredData'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState('')
    const [generatedLink, setGeneratedLink] = useState('')

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
            setGeneratedLink(link)
            setResult(
                `Here's your link:<br /><a href="${link}" target="_blank">${link}</a>`
            )
        } else {
            setResult('Please enter a question first!')
            setGeneratedLink('')
        }
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedLink)
            const originalResult = result
            setResult('Link copied to clipboard!')
            setTimeout(() => setResult(originalResult), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            generateLink()
        }
    }

    return (
        <>
            <StructuredData />
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
                        onKeyDown={handleKeyPress}
                    />
                    <div className="button-group">
                        <button id="generateBtn" onClick={generateLink}>
                            Generate Link
                        </button>
                        {generatedLink && (
                            <button id="copyBtn" onClick={copyToClipboard}>
                                Copy Link
                            </button>
                        )}
                    </div>
                    <div
                        id="result"
                        dangerouslySetInnerHTML={{ __html: result }}
                    />
                </div>
            </div>
        </>
    )
}

export default App
