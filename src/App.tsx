import React, { useState } from "react";

//types
import { Trivia, FilterTrivia, Difficulty } from "./types/Types";

//function
import { getTrivias } from "./api/Trivia";

//component
import QuestionCard from "./components/QuestionCard";

//style
import "./App.scss";

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [questions, setQuestions] = useState<Trivia[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [dificultyList] = useState<Difficulty[]>([
    Difficulty.EASY,
    Difficulty.MEDIUM,
    Difficulty.HARD,
  ]);
  const [filter, setFilter] = useState<FilterTrivia>({
    amount: TOTAL_QUESTIONS,
    difficulty: Difficulty.EASY,
  });

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      difficulty: e.currentTarget.value,
    });
  };

  const getList = async () => {
    setLoading(true);
    try {
      const res: Trivia[] = await getTrivias(filter);
      setQuestions(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const start = () => {
    setNumber(0);
    setIsGameOver(false);
    setScore(0);
    setAnswers([]);
    getList();
  };

  const next = () => {
    if (number === TOTAL_QUESTIONS - 1) return null;
    setNumber(number + 1);
  };

  const select = (answer: string, no: number) => {
    if (answer === questions[no].correct_answer) setScore(score + 1);
    setAnswers([...answers, answer]);
    if (no === TOTAL_QUESTIONS - 1) setIsGameOver(true);
  };

  return (
    <div className="app">
      <h1 className="header">Trivia Quiz</h1>
      <h3 className="score">{`Your score : ${score}`}</h3>
      <div className="dummy-box">
        {isLoading && <p>Loading the questions .....</p>}
        {questions.length === 0 && !isLoading && (
          <p className="att">Question will show when you click Start</p>
        )}
        {!isLoading && questions.length > 0 && (
          <QuestionCard
            number={number}
            answers={questions[number].answers}
            question={questions[number].question}
            choose={select}
          />
        )}
      </div>
      {isGameOver && (
        <div className="level-start">
          <select onChange={changeSelect} className="select">
            {dificultyList &&
              dificultyList.map((dif, index) => (
                <option key={index}>{dif}</option>
              ))}
          </select>
          <button className="btn blue" onClick={start}>
            Start
          </button>
        </div>
      )}
      {!isGameOver && answers.length === number + 1 ? (
        <button className="btn red" onClick={next}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
