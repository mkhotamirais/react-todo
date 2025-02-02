import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect, useState } from "react";
import { addTodo, setCheckedAll, setIsEdit, updateCheckedAll } from "./todo3Slice";
import Todo3List from "./Todo3List";
import toast from "react-hot-toast";
import Todo3ModalDelAll from "./Todo3ModalDelAll";
// import Todo3ModalDelAll from "./Todo3ModalDelAll";

export default function Todo3Home() {
  const [delId, setDelId] = useState<string | null>(null);
  const [delCheck, setDelCheck] = useState(false);
  const { todo, checkedAll } = useSelector((state: RootState) => state.todo);
  const sortedTodo = [...todo].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  // .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      dispatch(addTodo({ text }));
      toast.success(`Add ${text} success`);
      setText("");
    } else toast.error(`Add ${text} failed`);
  };

  const onFocus = () => {
    dispatch(setIsEdit({ id: null }));
  };

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, todo]);

  const onCheckAll = () => {
    dispatch(setCheckedAll(!checkedAll));
    dispatch(updateCheckedAll({ checkedAll }));
    dispatch(setIsEdit({ id: null }));
  };

  return (
    <>
      <h1 className="title">Todo3</h1>
      <div className="flex flex-wrap gap-1 mb-2">
        {["useState", "useEffect", "react-redux", "@reduxjs/toolkit", "react-hot-toast"].map((item, i) => (
          <div key={i} className="badge">
            {item}
          </div>
        ))}
      </div>
      {/* ADD TODO */}
      <form onSubmit={onSubmit} className="flex gap-1 mb-4">
        <input
          onFocus={onFocus}
          placeholder="add todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {/* LIST TODO */}
      {todo.length > 0 ? (
        <>
          <div className="h-8 flex justify-between items-center px-2 rounded-lg py-1 mb-2">
            <div>
              <input
                title="checkAll"
                type="checkbox"
                id="checkAllData"
                checked={checkedAll}
                className="mr-2"
                onChange={onCheckAll}
              />
              <label htmlFor="checkAllData" className="font-semibold py-2">
                Check All
              </label>
            </div>
            {checkedLength > 0 && (
              <>
                <button
                  type="button"
                  className="btn !bg-red-500"
                  onClick={() => {
                    setDelCheck(true);
                  }}
                >
                  Delete Checked
                </button>
                <Todo3ModalDelAll checkedLength={checkedLength} delCheck={delCheck} setDelCheck={setDelCheck} />
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 my-2">
            {sortedTodo.map((item) => (
              <Todo3List key={item.id} item={item} delId={delId} setDelId={setDelId} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center italic mt-4">Todo empty</div>
      )}
    </>
  );
}
