import { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";
import { InitialTodo } from "../../types";

interface Todo1ModaldelAllProps {
  todos: InitialTodo[];
  deleteChecked: () => void;
  checkedLength: number;
  delCheck: boolean;
  setDelCheck: Dispatch<SetStateAction<boolean>>;
}

export default function Todo1ModaldelAll({
  todos,
  deleteChecked,
  checkedLength,
  delCheck,
  setDelCheck,
}: Todo1ModaldelAllProps) {
  return (
    <div
      onClick={() => setDelCheck(false)}
      className={`${
        delCheck ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed inset-0 bg-white/50 z-50 transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          delCheck ? "translate-y-0" : "-translate-y-10"
        } bg-white border border-gray-300 rounded-none sm:rounded-md p-4 max-w-sm mx-auto mt-20 transition-all`}
      >
        <button
          onClick={() => setDelCheck(false)}
          type="button"
          title="close modal del"
          className="cursor-pointer hover:text-red-500 absolute right-4 top-4"
        >
          <FaXmark />
        </button>
        <div className="space-y-2">
          {checkedLength < todos.length ? (
            <p>Delete {checkedLength} checked data, Are you sure?</p>
          ) : (
            <p>Delete all data, Are you sure?</p>
          )}
          <div className="flex gap-2">
            <button onClick={deleteChecked} type="submit" className="btn !bg-red-500" autoFocus={true}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => setDelCheck(false)}
              className="bg-gray-100 hover:bg-gray-200 rounded px-2 transition"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
