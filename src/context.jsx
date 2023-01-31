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
  selectCounter: 0,
  correct: 0,
  checked: false,
};

const reducer = (state, action) => {
  console.log(state);
  if (action.type === "GET_DATA") {
    return { ...state, data: action.payload, isLoaded: true };
  }
  if (action.type === "SELECT_ANSWER") {
    let newSelectCounter = 0;
    const newData = state.data.map((el) => {
      const changedAns = el.answers.map((ans) => {
        if (ans.id === action.payload) {
          newSelectCounter++;
          return {
            ...ans,
            selected: !ans.selected,
          };
        } else return { ...ans };
      });
      return { ...el, answers: changedAns };
    });
    console.log(newData);
    return { ...state, data: newData, selectCounter: newSelectCounter };
  }

  if (action.type === "CHECK_ANSWERS") {
    return { ...state, checked: true };
  }
  if (action.type === "RESTART") {
    return { defaultState };
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
  }, [state.isLoaded]);

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
