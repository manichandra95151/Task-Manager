import  { createStore } from "redux";
import todoReducer from "./reducer/todoReducer"

export const todoStore=createStore(todoReducer)