import React from "react"

export default function StartScreen(props) {

    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            
            <button onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}