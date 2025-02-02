import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { InitialTodo } from "../../types";

interface TodoState {
  todo: InitialTodo[];
  isEdit: string | null;
  setIsEdit: (isEdit: string | null) => void;
  setTodo: (todo: InitialTodo[]) => void;
  addTodo: (text: string) => void;
  delTodo: (id: string) => void;
  toggleCheck: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  checkAllTodo: (check: boolean) => void;
  delChecked: () => void;
}

const setLocal = (todo: InitialTodo[]) => {
  localStorage.setItem("todo4", JSON.stringify(todo));
};

let todo: InitialTodo[];
const storage = localStorage.getItem("todo4");
if (storage) {
  todo = JSON.parse(storage);
} else todo = [];

export const useTodo4 = create<TodoState>((set) => ({
  todo,
  isEdit: null,
  setIsEdit: (isEdit) => set({ isEdit }),
  setTodo: (todo) => set({ todo }),
  addTodo: (text) => {
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const newTodo = { id: uuidv4(), text, checked: false, createdAt, updatedAt };
    set((state) => {
      const todo = [...state.todo, newTodo];
      setLocal(todo);
      return { todo };
    });
  },
  delTodo: (id) => {
    set((state) => {
      const todo = state.todo.filter((t) => t.id !== id);
      setLocal(todo);
      return { todo };
    });
  },
  toggleCheck: (id) => {
    set((state) => {
      const todo = state.todo.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t));
      setLocal(todo);
      return { todo };
    });
  },
  editTodo: (id, text) => {
    const updatedAt = new Date().toISOString();
    set((state) => {
      const todo = state.todo.map((t) => (t.id === id ? { ...t, text, updatedAt } : t));
      setLocal(todo);
      return { todo };
    });
  },
  checkAllTodo: (check) => {
    set((state) => {
      const todo = state.todo.map((t) => (check ? { ...t, checked: false } : { ...t, checked: true }));
      setLocal(todo);
      return { todo };
    });
  },
  delChecked: () => {
    set((state) => {
      const todo = state.todo.filter((t) => !t.checked);
      setLocal(todo);
      return { todo };
    });
  },
}));
