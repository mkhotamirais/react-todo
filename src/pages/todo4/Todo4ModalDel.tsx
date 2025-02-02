import { Dispatch, SetStateAction } from "react";
import { InitialTodo } from "../../types";
import { FaXmark } from "react-icons/fa6";
import { useTodo4 } from "./useTodo4";
import { toast } from "sonner";

interface Todo4ModalDelProps {
  item: InitialTodo;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
  delId: string | null;
  setDelId: Dispatch<SetStateAction<string | null>>;
}

export default function Todo4ModalDel({ item, setNewText, delId, setDelId }: Todo4ModalDelProps) {
  const { setIsEdit, delTodo } = useTodo4();
  const onSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    delTodo(item.id);
    toast.success(`Delete ${item.text} success`);
  };

  const onCancel = () => {
    setDelId(null);
    setNewText(item.text);
    setIsEdit(null);
  };
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
            <button onClick={onSubmit} type="submit" className="btn !bg-red-500" autoFocus={true}>
              Delete
            </button>
            <button type="button" onClick={onCancel} className="bg-gray-100 hover:bg-gray-200 rounded px-2 transition">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
