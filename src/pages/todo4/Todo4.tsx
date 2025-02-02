import Layout from "../../components/Layout";
import { toast, Toaster } from "sonner";
import { useTodo4 } from "./useTodo4";
import { useEffect, useState } from "react";
import Todo4List from "./Todo4List";
import Todo4ModalDelAll from "./Todo4ModalDelAll";

export default function Todo4() {
  const { todo, checkAllTodo, addTodo, setIsEdit } = useTodo4();
  const [checkedAll, setCheckedAll] = useState(false);
  const [text, setText] = useState("");
  const [delId, setDelId] = useState<string | null>(null);
  const [delCheck, setDelCheck] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      addTodo(text);
      toast.success(`Add ${text} success`);
      setText("");
    } else toast.error(`Input text required`);
  };

  const onFocus = () => {
    setIsEdit(null);
  };

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, todo]);

  const onCheckAll = () => {
    setCheckedAll((prev) => !prev);
    checkAllTodo(checkedAll);
    setIsEdit(null);
  };
  return (
    <Layout>
      <Toaster richColors position="top-center" />

      <h1 className="title">Todo4</h1>
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
                <Todo4ModalDelAll checkedLength={checkedLength} delCheck={delCheck} setDelCheck={setDelCheck} />
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 my-2">
            {todo.map((item) => (
              <Todo4List key={item.id} item={item} delId={delId} setDelId={setDelId} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center italic mt-4">Todo empty</div>
      )}
    </Layout>
  );
}
