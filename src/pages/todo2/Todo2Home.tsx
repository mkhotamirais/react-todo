import { useContext, useEffect, useState } from "react";
import Todo2List from "./Todo2List";
import { Todo2Context } from "./Todo2Provider";
import { enqueueSnackbar } from "notistack";
// import Todo2DelAllDialog from "./Todo2DelAllDialog";
import { v4 as uuidv4 } from "uuid";
import Todo2ModaldelAll from "./Todo2ModalDelAll";

export default function Todo2Home() {
  const context = useContext(Todo2Context);
  if (!context) throw Error("Data must be used");
  const { todo, checkedAll, setCheckedAll, dispatch, text, setText, setIsEdit } = context;
  const [delCheck, setDelCheck] = useState(false);

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, setCheckedAll, todo]);

  const onCheckAll = () => {
    setCheckedAll((prev) => !prev);
    dispatch({ type: "CHECK_ALL", payload: checkedAll });
    setIsEdit(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    // cek input
    if (!text) return enqueueSnackbar(`Input required`, { variant: "error" });
    // cek duplikat
    const duplicate = todo.find((t) => t.text.toLowerCase() === text.toLowerCase());
    if (duplicate) return enqueueSnackbar(`Todo "${text}" registered`, { variant: "error" });
    dispatch({ type: "ADD_TODO", payload: { id: uuidv4(), text, checked: false, createdAt, updatedAt } });
    enqueueSnackbar(`Add ${text} success`, {
      variant: "success",
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
    setText("");
  };

  return (
    <div>
      <h1 className="title">Todo2</h1>
      <div className="flex flex-wrap gap-1 mb-2">
        {["useState", "useEffect", "useContext", "useReducer", "notistack"].map((item, i) => (
          <div key={i} className="badge">
            {item}
          </div>
        ))}
      </div>
      {/* ADD TODO */}
      <form onSubmit={onSubmit} className="flex gap-1 mb-4">
        <input
          onFocus={() => {
            setIsEdit(null);
          }}
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
                <Todo2ModaldelAll checkedLength={checkedLength} delCheck={delCheck} setDelCheck={setDelCheck} />
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 my-2">
            {todo
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((item) => (
                <Todo2List key={item.id} item={item} />
              ))}
          </div>
        </>
      ) : (
        <div className="text-center italic mt-4">Todo empty</div>
      )}
    </div>
  );
}
