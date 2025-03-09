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
            cursor.style.left = `${inputRect.left + 10}px` // Slightly offset from edge
            cursor.style.top = `${inputRect.top + 10}px`

            await new Promise((resolve) => setTimeout(resolve, 1000))
            cursor.style.transform = 'scale(0.8)'
            await new Promise((resolve) => setTimeout(resolve, 100))
            cursor.style.transform = 'scale(1)'

            await new Promise((resolve) => setTimeout(resolve, 300))
            const typeCharacter = () => {
                if (index < queryText.length) {
                    setInputValue(queryText.substring(0, index + 1))
                    index++
                    setTimeout(typeCharacter, 120)
                } else {
                    // 4. Move to button after typing
                    setTimeout(async () => {
                        cursor.style.left = `${
                            buttonRect.left + buttonRect.width / 2
                        }px`
                        cursor.style.top = `${
                            buttonRect.top + buttonRect.height / 2
                        }px`

                        // 5. Click effect on button
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        )
                        cursor.style.transform = 'scale(0.8)'
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        cursor.style.transform = 'scale(1)'

                        // 6. Redirect to Twitter
                        await new Promise((resolve) => setTimeout(resolve, 300))
                        const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(
                            query
                        )}`
                        window.location.href = chatgptUrl
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
                style={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    backgroundImage: `url(${MouseCursor})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    left: 0,
                    top: 0,
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
