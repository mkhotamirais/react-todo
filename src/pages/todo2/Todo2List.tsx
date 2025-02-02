import { useContext, useState } from "react";
import { InitialTodo } from "../../types";
import { FaCheck, FaPenToSquare, FaTrash, FaXmark } from "react-icons/fa6";
import { Todo2Context } from "./Todo2Provider";
import { enqueueSnackbar } from "notistack";
import Todo2Modaldel from "./Todo2ModalDel";
// import Todo2Modaldel from "./Todo2Modaldel";

interface Todo2ListProps {
  item: InitialTodo;
}

export default function Todo2List({ item }: Todo2ListProps) {
  const context = useContext(Todo2Context);
  if (!context) throw Error("error context");
  const { todo, dispatch, isEdit, setIsEdit } = context;

  const [newText, setNewText] = useState(item.text);
  const [delId, setDelId] = useState<string | null>(null);

  const onChangeCheck = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
    setIsEdit(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    // cek input
    if (!newText) return enqueueSnackbar(`Input required`, { variant: "error" });
    // cek duplicate except current todo
    const duplikat = todo.find((t) => t.text === newText && t.id !== item.id);
    if (duplikat) return enqueueSnackbar(`Todo "${newText}" registered`, { variant: "error" });

    dispatch({ type: "UPDATE_TODO", payload: { id: item.id, text: newText, updatedAt: new Date().toISOString() } });
    setIsEdit(null);
    enqueueSnackbar(`Update ${item.text} to ${newText} success`, { variant: "success" });
  };

  return (
    <div className="border border-gray-300 py-1 px-2 rounded-lg flex justify-between items-center gap-2">
      <input
        disabled={isEdit === item.id}
        title="input todo2"
        type="checkbox"
        checked={item.checked}
        onChange={() => onChangeCheck(item.id)}
      />
      {isEdit === item.id ? (
        <form onSubmit={onSubmit} className="w-full">
          <input
            onFocus={() => {
              setIsEdit(item.id);
            }}
            autoFocus
            className="w-full"
            title="input todo2 value"
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
            }}
            type="button"
            title="delete todo"
            className="text-red-500 cursor-pointer"
          >
            <FaTrash />
          </button>
          <Todo2Modaldel item={item} setNewText={setNewText} delId={delId} setDelId={setDelId} />
        </div>
      )}
    </div>
  );
}
