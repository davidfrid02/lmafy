import React, { useState, useEffect } from 'react'
import './chatGPTComponent.css'
import { ReactComponent as EnterButton } from '../../icons/enterButton.svg'
import { ReactComponent as ArrowDown } from '../../icons/arrowDown.svg'

function ChatGPTComponent({ query }) {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const queryText = decodeURIComponent(query)
        let index = 0

        const typeCharacter = () => {
            if (index < queryText.length) {
                setInputValue(queryText.substring(0, index + 1))
                index++
                setTimeout(typeCharacter, 175)
            } else {
                const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(
                    query
                )}`
                window.location.href = chatgptUrl
            }
        }
        typeCharacter()
    }, [query])

    return (
        <div className="chatGPTComponent">
            <div className="header">
                <div className="header-title">ChatGPT</div>
                <div className="header-icons">
                    <ArrowDown />
                </div>
            </div>
            <div className="chat-area">
                <div className="userQuestion">{inputValue}</div>
                <div className="enterButton">
                    <EnterButton />
                </div>
            </div>
        </div>
    )
}

export default ChatGPTComponent
