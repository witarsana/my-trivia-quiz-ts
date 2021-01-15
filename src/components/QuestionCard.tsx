import React, { useState, useEffect } from "react";
import "../styles/QuestionCard.scss";

interface Props {
  question: string;
  answers: string[];
  number: number;
  choose: (answer: string, no: number) => void;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  number,
  choose,
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const chooseClick = (answer: string, no: number) => {
    setSelected(true);
    choose(answer, no);
  };
  useEffect(() => {
    setSelected(false);
  }, [number]);
  return (
    <div className="question-card">
      <p className="question-no">Question no {number + 1}</p>
      <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="button-group">
        {answers.map((answer, idx) => (
          <button
            className="btn blue ans"
            onClick={() => chooseClick(answer, number)}
            value={answer}
            disabled={selected ? true : false}
            key={idx}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
