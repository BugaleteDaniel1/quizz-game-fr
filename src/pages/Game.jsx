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
  const { isLoaded, data } = props.state;
  const { dispatch } = props;
  if (isLoaded) {
    const questions = data.map((question) => {
      return (
        <div className="question-container" key={question.q.id}>
          <h3 className="questions">{transformText(question.q.q)}</h3>
          <div className="answers-container">
            {question.answers.map(({ answer, id, selected }) => {
              return (
                <span
                  onClick={() =>
                    dispatch({ type: "SELECT_ANSWER", payload: id })
                  }
                  key={id}
                  className={selected ? "selected-answer" : "answer"}
                >
                  {answer}
                </span>
              );
            })}
          </div>
        </div>
      );
    });
    return (
      <>
        <div>{questions}</div>
        <button>Check Answers</button>
      </>
    );
  } else return <Loading />;
};
