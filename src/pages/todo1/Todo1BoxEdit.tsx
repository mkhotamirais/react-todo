import { useState } from "react";
import { EditParam, InitialTodo } from "../../types";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

interface Todo1BoxEditProps {
  item: InitialTodo;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setErr: React.Dispatch<React.SetStateAction<string>>;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  editTodo: ({ e, item, newText }: EditParam) => void;
}

export default function Todo1BoxEdit({ item, setMsg, setErr, setIsEdit, editTodo }: Todo1BoxEditProps) {
  const [newText, setNewText] = useState(item.text);

  return (
    <div className="flex w-full justify-between gap-2">
      <form onSubmit={(e) => editTodo({ e, item, newText })} className="w-full">
        <input
          onFocus={() => {
            setIsEdit(item.id);
            setMsg("");
            setErr("");
          }}
          autoFocus
          className="w-full focus:outline-gray-200"
          title="input todo1 value"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      </form>

      <div className="flex gap-4">
        <button
          type="button"
          title="save todo"
          className="text-green-500 cursor-pointer"
          onClick={(e) => editTodo({ e, item, newText })}
        >
          <FaCheck />
        </button>
        <button
          type="button"
          title="cancel save"
          className="text-red-500 cursor-pointer"
          onClick={() => {
            setIsEdit(null);
            setNewText(item.text);
            setMsg("");
            setErr("");
          }}
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
}
