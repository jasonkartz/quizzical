import React, { useState } from "react";
import "./index.css";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [quizStage, setQuizStage] = useState("start");

  let tally = 0;
  quizData.map((data) => data.correct_answer_selected && tally++);

  function initializeGame() {
    setQuizData([]);
    setQuizStage("start");
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
      setQuizStage("complete");
    }
  }

  async function startGame(gameSettings) {
    setQuizStage("loading");
    const difficulty = {
      any: "",
      easy: "&difficulty=easy",
      medium: "&difficulty=medium",
      hard: "&difficulty=hard",
    };

    const category = {
      "Any Category": "",
      "General Knowledge": "&category=9",
      "Entertainment: Books": "&category=10",
      "Entertainment: Film": "&category=11",
      "Entertainment: Music": "&category=12",
      "Entertainment: Musicals & Theatres": "&category=13",
      "Entertainment: Television": "&category=14",
      "Entertainment: Video Games": "&category=15",
      "Entertainment: Board Games": "&category=16",
      "Science & Nature": "&category=17",
      "Science: Computers": "&category=18",
      "Science: Mathematics": "&category=19",
      Mythology: "&category=20",
      Sports: "&category=21",
      Geography: "&category=22",
      History: "&category=23",
      Politics: "&category=24",
      Art: "&category=25",
      Celebrities: "&category=26",
      Animals: "&category=27",
      Vehicles: "&category=28",
      "Entertainment: Comics": "&category=29",
      "Science: Gadgets": "&category=30",
      "Entertainment: Japanese Anime & Manga": "&category=31",
      "Entertainment: Cartoon & Animations": "&category=32",
    };
    const type = {
      multiple: "&type=multiple",
      any: "",
    };
    const amount = {
      "5": "5",
      "10": "10",
      "15": "15",
      "20": "20"
    }
    await fetch(
      `https://opentdb.com/api.php?amount=${amount[gameSettings.amount]}${
        difficulty[gameSettings.difficulty]
      }${category[gameSettings.category]}${type[gameSettings.type]}`
    )
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((data, index) => {
            const shuffledArray = [
              decodeHTML(data.correct_answer),
              ...data.incorrect_answers.map((answer) => decodeHTML(answer)),
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
    setQuizStage("active");
  }

  const questions = quizData.map((data) => {
    return (
      <Question
        key={data.id}
        id={data.id}
        category={data.category}
        question={data.question}
        answerArray={data.shuffled_answers}
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
      {quizStage === "start" || quizStage === "loading" ? (
        <StartScreen startGame={startGame} status={quizStage} />
      ) : (
        questions
      )}
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
          <p>
            You scored {tally}/{quizData.length} correct answers
          </p>
          <button className="main-btn" onClick={initializeGame}>
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}
