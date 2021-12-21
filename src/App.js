import React, { useState, useEffect } from "react";
import "./index.css";
import { nanoid } from "nanoid";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import Blob from "./Components/Blob";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [quizStage, setquizStage] = useState("start");

  let tally = 0;
  quizData.map((data) => data.correct_answer_selected && tally++);

  function initializeGame() {
    setQuizData([])
    setquizStage("start")
  }

  function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function handleClick(answer, id) {
    setQuizData((quizData) =>
      quizData.map((data) => ({
        ...data,
        selected_answer: id === data.id ? answer : data.selected_answer,
      }))
    );
  }

  function checkAnswers() {
    if (quizData.every((data) => data.selected_answer)) {
      setQuizData((quizData) =>
        quizData.map((data) => ({
          ...data,
          correct_answer_selected:
            data.selected_answer === data.correct_answer ? true : false,
        }))
      );
      setquizStage("complete");
    }
  }

  function startGame() {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((data, index) => {
            const shuffledArray = [
              data.correct_answer,
              ...data.incorrect_answers,
            ];
            for (let i = shuffledArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = shuffledArray[i];
              shuffledArray[i] = shuffledArray[j];
              shuffledArray[j] = temp;
            }
            return {
              id: index,
              ...data,
              question: decodeHTML(data.question),
              correct_answer: decodeHTML(data.correct_answer),
              selected_answer: "",
              shuffled_answers: shuffledArray,
              correct_answer_selected: null,
            };
          })
        )
      );
    setquizStage("active");
  }

 

  const questions = quizData.map((data) => {
    return (
      <Question
        key={data.id}
        id={data.id}
        question={data.question}
        answer1={decodeHTML(data.shuffled_answers[0])}
        answer2={decodeHTML(data.shuffled_answers[1])}
        answer3={decodeHTML(data.shuffled_answers[2])}
        answer4={decodeHTML(data.shuffled_answers[3])}
        selected_answer={data.selected_answer}
        correct_answer={data.correct_answer}
        correct_answer_selected={data.correct_answer_selected}
        quizStage={quizStage}
        handleClick={handleClick}
      />
    );
  });

  return (
    <main>
      {quizStage === "start" ? <StartScreen handleClick={startGame} /> : questions}
      {quizStage === "active" && (
        <div className="game-complete-panel">
          <button
            className="main-btn"
            onClick={checkAnswers}
            disabled={!quizData.every((data) => data.selected_answer)}
          >
            Check Answers
          </button>
        </div>
      )}

      {quizStage === "complete" && (
        <div className="game-complete-panel">
          <p>You scored {tally}/5 correct answers</p>
          <button 
            className="main-btn" 
            onClick={initializeGame}
            >
            Play Again
          </button>
        </div>
      ) } 
      <Blob style="blob blob-left"/>
      <Blob style="blob blob-right"/>
    </main>
  );
}

/*
 useEffect(() => {
    initializeGame();
  }, []);

      <Blob style="blob blob-left"/>
      <Blob style="blob blob-right"/>
*/
