import { Loading } from "../components/Loading";
import { useGlobalContext } from "../context";

export const Game = () => {
  const props = useGlobalContext();
  const { isLoaded, data } = props.state;
  const { dispatch } = props;
  console.log(data);
  if (isLoaded) {
    const questions = data.map((question) => {
      const text = question.q.q;
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(text, "text/html");
      const unescapedText = htmlDoc.body.textContent;
      return (
        <div className="question-container" key={question.q.id}>
          <h3 className="questions">{unescapedText}</h3>
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
    return <div>{questions}</div>;
  } else return <div>wait</div>;
};
