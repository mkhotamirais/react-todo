import { toast } from "sonner";
import { useTodo4 } from "./useTodo4";
import { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";

interface Todo4ModalDelAll {
  checkedLength: number;
  delCheck: boolean;
  setDelCheck: Dispatch<SetStateAction<boolean>>;
}

export default function Todo4ModalDelAll({ checkedLength, delCheck, setDelCheck }: Todo4ModalDelAll) {
  const { todo, delChecked } = useTodo4();

  const onSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    delChecked();
    if (checkedLength === todo.length) {
      toast.success(`Delete all data success, total deleted ${todo.length} data`);
    } else toast.success(`Delete ${checkedLength} data success`);
  };
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
          {checkedLength < todo.length ? (
            <p>Delete {checkedLength} checked data, Are you sure?</p>
          ) : (
            <p>Delete all data, Are you sure?</p>
          )}
          <div className="flex gap-2">
            <button onClick={onSubmit} type="submit" className="btn !bg-red-500" autoFocus={true}>
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
