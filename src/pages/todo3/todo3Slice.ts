import { createSlice } from "@reduxjs/toolkit";
import { InitialTodo } from "../../types";
import { v4 as uuidv4 } from "uuid";
// import { initialTodo } from "../../locales/all/common";

const setLocal = (state: { todo: InitialTodo[] }) => {
  localStorage.setItem("todo3", JSON.stringify(state.todo));
};

interface TodoState {
  todo: InitialTodo[];
  isEdit: string | null;
  checkedAll: boolean;
}

const initialState: TodoState = {
  // todo: initialTodo,
  todo: JSON.parse(localStorage.getItem("todo3") || "[]"),
  isEdit: null,
  checkedAll: false,
} satisfies TodoState as TodoState;

export const todo3Slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsEdit(state, action) {
      state.isEdit = action.payload.id;
    },
    setCheckedAll(state, action) {
      state.checkedAll = action.payload;
    },
    addTodo(state, action) {
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();
      const result = { id: uuidv4(), text: action.payload.text, checked: false, createdAt, updatedAt };
      state.todo.push(result);
      setLocal(state);
    },
    deleteTodo(state, action) {
      const others = state.todo.filter((item) => item.id !== action.payload.id);
      state.todo = others;
      setLocal(state);
    },
    toggleCheck(state, action) {
      state.todo = state.todo.map((t) => (t.id === action.payload.id ? { ...t, checked: !t.checked } : t));
      setLocal(state);
    },
    updateTodo(state, action) {
      const updatedAt = new Date().toISOString();
      state.todo = state.todo.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text, updatedAt } : t
      );
      setLocal(state);
    },
    updateCheckedAll(state, action) {
      state.todo = state.todo.map((t) =>
        action.payload.checkedAll ? { ...t, checked: false } : { ...t, checked: true }
      );
      setLocal(state);
    },
    deleteChecked(state) {
      state.todo = state.todo.filter((t) => !t.checked);
      setLocal(state);
    },
  },
});

export const {
  setIsEdit,
  setCheckedAll,
  addTodo,
  deleteTodo,
  toggleCheck,
  updateTodo,
  updateCheckedAll,
  deleteChecked,
} = todo3Slice.actions;

export default todo3Slice.reducer;
