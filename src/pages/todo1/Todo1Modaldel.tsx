import { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";
import { InitialTodo } from "../../types";

interface Todo1ModaldelProps {
  item: InitialTodo;
  delId: string | null;
  setDelId: Dispatch<SetStateAction<string | null>>;
  delTodo: (todoData: InitialTodo) => void;
}

export default function Todo1Modaldel({ item, delId, setDelId, delTodo }: Todo1ModaldelProps) {
  return (
    <div
      onClick={() => setDelId(null)}
      className={`${
        delId === item.id ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed inset-0 bg-white/50 z-50 transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          delId === item.id ? "translate-y-0" : "-translate-y-10"
        } bg-white border border-gray-300 rounded-none sm:rounded-md p-4 max-w-sm mx-auto mt-20 transition-all`}
      >
        <button
          onClick={() => setDelId(null)}
          type="button"
          title="close modal del"
          className="cursor-pointer hover:text-red-500 absolute right-4 top-4"
        >
          <FaXmark />
        </button>
        <div className="space-y-2">
          <p>
            Delete <i className="text-red-500">{item.text}</i>{" "}
          </p>
          <p>Are you sure?</p>
          <div className="flex gap-2">
            <button onClick={() => delTodo(item)} type="submit" className="btn !bg-red-500" autoFocus={true}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => setDelId(null)}
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
