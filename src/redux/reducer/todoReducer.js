import { ADD_TODO, DELETE_TODO, TOGGLE_TODO,EDIT_TODO } from '../actions/todoActions';
const initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { ...action.payload, id: Date.now(), completed: false }];
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...action.payload } : todo
      );
    default:
      return state;
  }
};

export default todoReducer;
