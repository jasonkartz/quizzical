import React, { useState } from "react";

export default function StartScreen(props) {
  const [gameSettings, setGameSettings] = useState({
    category: "Any Category",
    difficulty: "any",
    type: "multiple",
    amount: "5"
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setGameSettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="start-screen">
      <h1>Quizzical</h1>

      <select name="difficulty" value={props.value} onChange={handleChange}>
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select name="category" value={props.value} onChange={handleChange}>
        <option value="Any Category">Any Category</option>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Animals">Animals</option>
        <option value="Art">Art</option>
        <option value="Entertainment: Board Games">Board Games</option>
        <option value="Entertainment: Books">Books</option>
        <option value="Entertainment: Cartoon & Animations">Cartoon &#38; Animations</option>
        <option value="Celebrities">Celebrities</option>
        <option value="Entertainment: Comics">Comics</option>
        <option value="Science: Computers">Computers</option>
        <option value="Entertainment: Film">Film</option>
        <option value="Science: Gadgets">Gadgets</option>
        <option value="Geography">Geography</option>
        <option value="History">History</option>
        <option value="Entertainment: Japanese Anime & Manga">
          Japanese Anime &#38; Manga
        </option>
        <option value="Science: Mathematics">Mathematics</option>
        <option value="Entertainment: Music">Music</option>
        <option value="Entertainment: Musicals & Theatres">Musicals &#38; Theatres</option>
        <option value="Mythology">Mythology</option>
        <option value="Politics">Politics</option>
        <option value="Science & Nature">Science &#38; Nature</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment: Television">Television</option>
        <option value="Entertainment: Video Games">Video Games</option>
        <option value="Vehicles">Vehicles</option>
      </select>

      <select name="type" value={props.value} onChange={handleChange}>
        <option value="multiple">Multiple Choice Only</option>
        <option value="any">Multiple Choice + True / False</option>
      </select>

      <select name="amount" value={props.value} onChange={handleChange}>
        <option value="5">5 Questions</option>
        <option value="10">10 Questions</option>
        <option value="15">15 Questions</option>
        <option value="20">20 Questions</option>
      </select>

      <button onClick={() => props.startGame(gameSettings)}>
        {props.status === "loading" ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
}


