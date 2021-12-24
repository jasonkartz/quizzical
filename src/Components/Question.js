import React from "react";

export default function Question(props) {
  const btnArray = props.answerArray.map((answer) => {
    return (
      <button
        key={props.answerArray.indexOf(answer)}
        disabled={props.quizStage === "complete" ? true : false}
        className={selected(answer)}
        onClick={() => props.handleClick(answer, props.id)}
      >
        {answer}
      </button>
    );
  });

  function selected(answer) {
    if (props.selected_answer === answer && props.correct_answer_selected) {
      return "answer-btn correct";
    } else if (
      props.selected_answer === answer &&
      props.correct_answer_selected === false
    ) {
      return "answer-btn incorrect";
    } else if (
      answer === props.correct_answer &&
      props.correct_answer_selected === false
    ) {
      return "answer-btn missed";
    } else if (props.selected_answer === answer) {
      return "answer-btn selected";
    } else {
      return "answer-btn";
    }
  }
  return (
    <section className="quiz">
      <div>
        <p>{props.category}</p>
        <h1>{props.question}</h1>
      </div>
      <div className="btn-array">
        {btnArray}
      </div>
    </section>
  );
}
