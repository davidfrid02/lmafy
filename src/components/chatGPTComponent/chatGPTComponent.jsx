import React, { useState, useEffect, useRef } from 'react'
import './chatGPTComponent.css'
import { ReactComponent as EnterButton } from '../../icons/enterButton.svg'
import { ReactComponent as ArrowDown } from '../../icons/arrowDown.svg'
import MouseCursor from '../../icons/mouseCursor.svg'

function ChatGPTComponent({ query }) {
    const [inputValue, setInputValue] = useState('')
    const cursorRef = useRef(null)
    const questionRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const queryText = decodeURIComponent(query)
        let index = 0

        const simulateInteraction = async () => {
            const cursor = cursorRef.current
            const userQuestion = questionRef.current
            const enterButton = buttonRef.current

            if (!cursor || !userQuestion || !enterButton) return

            const inputRect = userQuestion.getBoundingClientRect()
            const buttonRect = enterButton.getBoundingClientRect()

            cursor.style.transition = 'all 1s ease'
            cursor.style.left = `${inputRect.width}px`
            cursor.style.top = `${inputRect.top + 30}px`

            await new Promise((resolve) => setTimeout(resolve, 1000))
            cursor.style.transform = 'scale(0.8)'
            await new Promise((resolve) => setTimeout(resolve, 100))
            cursor.style.transform = 'scale(1)'

            await new Promise((resolve) => setTimeout(resolve, 300))
            const typeCharacter = () => {
                if (index < queryText.length) {
                    setInputValue(queryText.substring(0, index + 1))
                    index++
                    setTimeout(typeCharacter, 100)
                } else {
                    setTimeout(async () => {
                        cursor.style.left = `${
                            buttonRect.left + buttonRect.width / 2
                        }px`
                        cursor.style.top = `${
                            buttonRect.top + buttonRect.height / 2
                        }px`

                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        )
                        cursor.style.transform = 'scale(0.8)'
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        cursor.style.transform = 'scale(1)'

                        await new Promise((resolve) => setTimeout(resolve, 300))
                        const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(
                            query
                        )}`
                        // window.location.href = chatgptUrl
                    }, 500)
                }
            }
            typeCharacter()
        }

        simulateInteraction()
    }, [query])

    return (
        <div className="chatGPTComponent">
            <div
                ref={cursorRef}
                className="cursor-element"
                style={{
                    position: 'absolute',
                    width: '32px',
                    height: '32px',
                    backgroundImage: `url(${MouseCursor})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    left: '25%',
                    top: '20%',
                    transformOrigin: 'top left',
                    transition: 'transform 0.1s ease',
                }}
            />

            <div className="header">
                <div className="header-title">ChatGPT</div>
                <div className="header-icons">
                    <ArrowDown />
                </div>
            </div>
            <div className="chat-area">
                <div ref={questionRef} className="userQuestion">
                    {inputValue}
                </div>
                <div ref={buttonRef} className="enterButton">
                    <EnterButton />
                </div>
            </div>
        </div>
    )
}

export default ChatGPTComponent
