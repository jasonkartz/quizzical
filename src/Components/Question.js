import React from "react";

export default function Question(props) {
    function selected (answer) {
        if (props.selected_answer === answer && props.correct_answer_selected) {
            return "answer-btn correct"
        } else if (props.selected_answer === answer && props.correct_answer_selected === false) {
            return "answer-btn incorrect"
        } else if (answer === props.correct_answer && props.correct_answer_selected === false) {
          return "answer-btn missed"
        } else if (props.selected_answer === answer){
            return "answer-btn selected"
        } else {
            return "answer-btn"
        }

    }  
  return (
    <section className="quiz">
      <h1>{props.question}</h1>
      <div className="btn-array">
        <button
          disabled={props.quizStage === "complete" ? true : false}
          className={selected(props.answer1)}
          onClick={() => props.handleClick(props.answer1, props.id)}
        >
          {props.answer1}
        </button>
        <button
          disabled={props.quizStage === "complete" ? true : false}
          className={selected(props.answer2)}
          onClick={() => props.handleClick(props.answer2, props.id)}
        >
          {props.answer2}
        </button>
        <button
          disabled={props.quizStage === "complete" ? true : false}
          className={selected(props.answer3)}
          onClick={() => props.handleClick(props.answer3, props.id)}
        >
          {props.answer3}
        </button>
        <button
          disabled={props.quizStage === "complete" ? true : false}
          className={selected(props.answer4)}
          onClick={() => props.handleClick(props.answer4, props.id)}
        >
          {props.answer4}
        </button>
      </div>
    </section>
  );
}
