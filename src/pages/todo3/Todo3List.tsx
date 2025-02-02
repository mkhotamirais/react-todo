import React, { Dispatch, SetStateAction, useState } from "react";
import { FaCheck, FaPenToSquare, FaTrash, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setIsEdit, toggleCheck, updateTodo } from "./todo3Slice";
import toast from "react-hot-toast";
import { InitialTodo } from "../../types";
import Todo3ModalDel from "./Todo3ModalDel";

interface Todo3ListProps {
  item: InitialTodo;
  delId: string | null;
  setDelId: Dispatch<SetStateAction<string | null>>;
}

export default function Todo3List({ item, delId, setDelId }: Todo3ListProps) {
  const [newText, setNewText] = useState(item.text);
  const { isEdit } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newText) {
      dispatch(updateTodo({ id: item.id, text: newText }));
      toast.success(`Update ${item.text} to ${newText} success`);
      dispatch(setIsEdit({ id: null }));
    } else toast.error(`Input text required`);
  };
  return (
    <div className="border border-gray-300 py-1 px-2 rounded-lg flex justify-between items-center gap-2">
      <input
        disabled={isEdit === item.id}
        title="input todo3"
        type="checkbox"
        checked={item.checked}
        onChange={() => {
          dispatch(toggleCheck({ id: item.id }));
          dispatch(setIsEdit({ id: null }));
        }}
      />
      {isEdit === item.id ? (
        <form onSubmit={onSubmit} className="w-full">
          <input
            onFocus={() => dispatch(setIsEdit({ id: item.id }))}
            autoFocus
            className="w-full"
            title="input todo3 value"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </form>
      ) : (
        <div
          className={`w-full hover:cursor-text ${item.checked ? "line-through" : ""}`}
          onClick={() => {
            if (!item.checked) {
              dispatch(setIsEdit({ id: item.id }));
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
              dispatch(setIsEdit({ id: null }));
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
            onClick={() => dispatch(setIsEdit({ id: item.id }))}
          >
            <FaPenToSquare />
          </button>
          <button
            onClick={() => {
              setDelId(item.id);
              dispatch(setIsEdit({ id: null }));
            }}
            type="button"
            title="delete todo"
            className="text-red-500 cursor-pointer"
          >
            <FaTrash />
          </button>
          <Todo3ModalDel item={item} setNewText={setNewText} delId={delId} setDelId={setDelId} />
        </div>
      )}
    </div>
  );
}
