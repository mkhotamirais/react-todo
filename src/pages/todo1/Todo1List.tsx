import { Dispatch, SetStateAction } from "react";
import { EditParam, InitialTodo } from "../../types";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Todo1Modaldel from "./Todo1Modaldel";
import Todo1BoxEdit from "./Todo1BoxEdit";

interface Todo1ListProps {
  item: InitialTodo;
  delId: string | null;
  setDelId: Dispatch<SetStateAction<string | null>>;
  delTodo: (todoData: InitialTodo) => void;
  isEdit: string | null;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  editTodo: ({ e, item, newText }: EditParam) => void;
  setMsg: Dispatch<SetStateAction<string>>;
  setErr: Dispatch<SetStateAction<string>>;
  checkTodo: (id: string) => void;
}

export default function Todo1List({
  item,
  delId,
  setDelId,
  delTodo,
  isEdit,
  setIsEdit,
  editTodo,
  setMsg,
  setErr,
  checkTodo,
}: Todo1ListProps) {
  return (
    <div className="border border-gray-300 py-1 px-2 rounded-lg flex justify-between items-center gap-2">
      <input
        disabled={isEdit === item.id}
        title="input todo1"
        type="checkbox"
        checked={item.checked}
        onChange={() => checkTodo(item.id)}
      />
      {isEdit === item.id ? (
        // <div>halo</div>
        <Todo1BoxEdit item={item} setMsg={setMsg} setErr={setErr} setIsEdit={setIsEdit} editTodo={editTodo} />
      ) : (
        <div className="flex w-full justify-between">
          <p
            className={`w-full hover:cursor-text ${item.checked ? "line-through" : ""}`}
            onClick={() => {
              if (!item.checked) {
                setIsEdit(item.id);
              }
            }}
          >
            {item.text}
          </p>
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
                setMsg("");
                setErr("");
              }}
              type="button"
              title="delete todo"
              className="text-red-500 cursor-pointer"
            >
              <FaTrash />
            </button>
            <Todo1Modaldel item={item} delId={delId} setDelId={setDelId} delTodo={delTodo} />
          </div>
        </div>
      )}
    </div>
  );
}
