export const defaultState = {
  isLoaded: false,
  data: ["no data for now"],
  counter: 0,
  correct: 0,
  checked: false,
};
let correctCounter = 0;
let incorrectCounter = 0;

export const reducer = (state, action) => {
  console.log(state);

  if (action.type === "GET_DATA") {
    return { ...state, data: action.payload, isLoaded: true };
  }
  if (action.type === "SELECT_ANSWER") {
    // debugger;
    const newData = state.data.map((el) => {
      const changedAns = el.answers.map((ans) => {
        if (ans.id === action.payload) {
          if (ans.id === action.payload && ans.correct === true) {
            correctCounter += 0.5;
          } else if (ans.id === action.payload && ans.selected === false) {
            incorrectCounter += 0.5;
          }
          return {
            ...ans,
            selected: !ans.selected,
          };
        } else return { ...ans };
      });
      return { ...el, answers: changedAns };
    });
    return {
      ...state,
      data: newData,
      correct: correctCounter,
      counter: incorrectCounter + correctCounter,
    };
  }

  if (action.type === "CHECK_ANSWERS") {
    return { ...state, checked: true };
  }
  if (action.type === "RESTART") {
    correctCounter = 0;
    incorrectCounter = 0;

    return { defaultState };
  }
  throw new Error("error");
};
