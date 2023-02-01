import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useGlobalContext } from "../context";

const transformText = (question) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(question, "text/html");
  const unescapedText = htmlDoc.body.textContent;
  return unescapedText;
};

export const Game = () => {
  const props = useGlobalContext();
  const { isLoaded, data, checked, correct, counter } = props.state;
  const { dispatch } = props;

  const check = () => {
    dispatch({ type: "CHECK_ANSWERS" });
  };
  const restart = () => {
    dispatch({ type: "RESTART" });
  };
  const checkAns = (id) => {
    dispatch({ type: "SELECT_ANSWER", payload: id });
  };

  if (isLoaded) {
    const questions = data.map((question) => {
      return (
        <div className="question-container" key={question.q.id}>
          <h3 className="questions">{transformText(question.q.q)}</h3>
          <div className="answers-container">
            {question.answers.map(({ answer, id, selected, correct }) => {
              let style = "";
              if (!checked) {
                style = selected ? "selected-answer" : "answer";
              }
              if (checked) {
                style = "answer-frozen";
                if (selected && correct) {
                  style = "correct";
                } else if (selected && !correct) style = "incorrect";
              }
              return (
                <span
                  onClick={!checked ? () => checkAns(id) : undefined}
                  key={id}
                  className={style}
                >
                  {transformText(answer)}
                </span>
              );
            })}
          </div>
        </div>
      );
    });
    return (
      <>
        {checked ? (
          <div>
            You answers correctly at {correct} questions out of {data.length}{" "}
          </div>
        ) : null}
        <div className="game">{questions}</div>
        {checked ? (
          <Link onClick={restart} className="check-btn" to="/">
            Restart
          </Link>
        ) : (
          <button disabled={counter < 5} className="check-btn" onClick={check}>
            check answers
          </button>
        )}
      </>
    );
  } else return <Loading />;
};
