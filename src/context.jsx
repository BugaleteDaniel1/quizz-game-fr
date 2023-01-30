import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { nanoid } from "nanoid";
// import { defaultState, reducer } from "./assets/defaultStateAndReducer";

const url = "https://opentdb.com/api.php?amount=5";

const context = createContext(null);

const shuffle = (arr) => {
  arr.sort(() => Math.random() - 0.5);
};

const defaultState = {
  isLoaded: false,
  data: ["no data for now"],
};

const reducer = (state, action) => {
  if (action.type === "GET_DATA") {
    return { ...state, data: action.payload, isLoaded: true };
  }
  if (action.type === "SELECT_ANSWER") {
    const newData = state.data.map((el) => {
      const changedAns = el.answers.map((ans) => {
        if (ans.id === action.payload) {
          return {
            ...ans,
            selected: !ans.selected,
          };
        } else return { ...ans };
      });
      return { ...el, answers: changedAns };
    });
    console.log(newData);
    return { ...state, data: newData };
  }
  throw new Error("error");
};

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      const results = json.results;
      proccessData(results);
    };
    getData();
  }, []);

  const proccessData = (results) => {
    const data = results.map((obj) => {
      const ans = [...obj.incorrect_answers].map((el) => {
        return {
          answer: el,
          correct: false,
          id: nanoid(),
          selected: false,
        };
      });
      ans.push({
        answer: obj.correct_answer,
        correct: true,
        id: nanoid(),
        selected: false,
      });
      shuffle(ans);
      return {
        q: { q: obj.question, id: nanoid() },
        answers: ans,
      };
    });
    dispatch({ type: "GET_DATA", payload: data });
  };

  //   const selectAnswer = (id) => {
  //     ;
  //   };

  return (
    <context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(context);
};
