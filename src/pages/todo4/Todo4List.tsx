import { Dispatch, SetStateAction, useState } from "react";
import { useTodo4 } from "./useTodo4";
import { InitialTodo } from "../../types";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";
import Todo4ModalDel from "./Todo4ModalDel";
import { toast } from "sonner";

interface Todo4ListProps {
  item: InitialTodo;
  delId: string | null;
  setDelId: Dispatch<SetStateAction<string | null>>;
}

export default function Todo4List({ item, delId, setDelId }: Todo4ListProps) {
  const [newText, setNewText] = useState(item.text);
  const { isEdit, setIsEdit, toggleCheck, editTodo } = useTodo4();

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newText) {
      editTodo(item.id, newText);
      toast.success(`Update ${item.text} to ${newText} success`);
      setIsEdit(null);
    } else toast.error(`Input text required`);
  };
  return (
    <div className="border border-gray-300 py-1 px-2 rounded-lg flex justify-between items-center gap-2">
      <input
        disabled={isEdit === item.id}
        title="input todo4"
        type="checkbox"
        checked={item.checked}
        onChange={() => {
          toggleCheck(item.id);
          setIsEdit(null);
        }}
      />
      {isEdit === item.id ? (
        <form onSubmit={onSubmit} className="w-full">
          <input
            onFocus={() => {
              setIsEdit(item.id);
            }}
            autoFocus
            className="w-full"
            title="input todo4 value"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </form>
      ) : (
        <div
          className={`w-full hover:cursor-text ${item.checked ? "line-through" : ""}`}
          onClick={() => {
            if (!item.checked) {
              setIsEdit(item.id);
            }
          }}
        >
          {newText}
        </div>
      )}
      {/* DELETE AND UPDATE BTN */}
      {isEdit === item.id ? (
        <div className="flex gap-4">
          <button type="button" title="save todo" className="text-green-500 cursor-pointer" onClick={onSubmit}>
            <FaCheck />
          </button>
          <button
            type="button"
            title="cancel save"
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setIsEdit(null);
              setNewText(item.text);
            }}
          >
            <FaXmark />
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            type="button"
            title="update todo"
            className="text-green-500 cursor-pointer"
            onClick={() => setIsEdit(item.id)}
          >
            <FaPenToSquare />
          </button>
          <button
            onClick={() => {
              setDelId(item.id);
              setIsEdit(null);
            }}
            type="button"
            title="delete todo"
            className="text-red-500 cursor-pointer"
          >
            <FaTrash />
          </button>
          <Todo4ModalDel item={item} setNewText={setNewText} delId={delId} setDelId={setDelId} />
        </div>
      )}
    </div>
  );
}
