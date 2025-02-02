import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { v4 as uuidv4 } from "uuid";
import { EditParam, InitialTodo } from "../../types";
import Todo1List from "./Todo1List";
import Todo1ModaldelAll from "./Todo1ModaldelAll";
import DynamicHead from "../../components/DynamicHead";

export default function Todo1() {
  const [todos, setTodos] = useState<InitialTodo[] | []>([]);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [checkedAll, setCheckedAll] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [delCheck, setDelCheck] = useState(false);

  const checkedLength = todos.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todos.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, todos.length]);

  useEffect(() => {
    const storage = localStorage.getItem("todo1");
    if (storage) {
      setTodos(JSON.parse(storage));
    } else setTodos([]);
  }, []);

  const setResult = (result: InitialTodo[]) => {
    setTodos(result);
    localStorage.setItem("todo1", JSON.stringify(result));
  };

  // ADD TODO
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    if (!text) {
      setErr("Input required");
      return;
    }
    // cek duplikat
    const duplikat = todos.find((t) => t.text === text);
    if (duplikat) {
      setErr(`Todo "${text}" registered`);
      return;
    }

    // cek input
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const result = [...todos, { id: uuidv4(), text, checked: false, createdAt, updatedAt }];
    setResult(result);
    setText("");
    setMsg(`Add ${text} success`);
  };
  const onFocusAdd = () => {
    setMsg("");
    setErr("");
    setIsEdit(null);
  };

  // DELETE TODO
  const delTodo = (todoData: InitialTodo) => {
    setMsg("");
    const result = todos.filter((t) => t.id !== todoData.id);
    setResult(result);
    setMsg(`Delete ${todoData.text} success`);
  };

  // EDIT TODO
  const editTodo = ({ e, item, newText }: EditParam) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    // cek duplicate except current
    const duplikat = todos.find((t) => t.text === newText && t.id !== item.id);
    if (duplikat) return setErr(`Todo "${newText}" registered`);

    const others = todos.filter((t) => t.id !== item.id);
    const match = todos.find((t) => t.id === item.id);
    if (match && newText) {
      match.text = newText;
      match.updatedAt = new Date().toISOString();
      const result = [...others, match];
      setResult(result);
      setIsEdit(null);
      setMsg(`Edit ${item.text} success`);
    } else setErr(`Input text reqired`);
  };

  // CHECK TODO
  const checkTodo = (id: string) => {
    setMsg("");
    setErr("");
    setIsEdit(null);
    const result = todos.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t));
    setResult(result);
    setTodos(result);
  };

  // CHECK ALL
  const checkAll = () => {
    setErr("");
    setIsEdit(null);
    setCheckedAll((prev) => !prev);
    const result = todos.map((t) => (checkedAll ? { ...t, checked: false } : { ...t, checked: true }));
    setResult(result);
  };

  // DELETE CHECKED
  const deleteChecked = () => {
    const result = todos.filter((t) => !t.checked);
    if (result.length === 0) setMsg(`Delete all data success, total deleted ${todos.length} data`);
    else setMsg(`Delete ${todos.length - result.length} data success`);
    setResult(result);
    setDelCheck(false);
  };

  return (
    <Layout>
      <DynamicHead title="React Todo - Todo1" />

      <h1 className="title">Todo1</h1>
      {/* TOOLS */}
      <div className="flex gap-1 mb-2">
        {["useState", "useEffect"].map((item, i) => (
          <div key={i} className="badge">
            {item}
          </div>
        ))}
      </div>
      {/* MESSAGES */}
      {msg && <p className="border border-blue-500 text-blue-500 bg-blue-100 py-1 px-2 rounded my-2">{msg}</p>}
      {err && <p className="border boeder-red-500 text-red-500 bg-red-100 py-1 px-2 rounded my-2">{err}</p>}
      {/* ADD TODO */}
      <form onSubmit={addTodo} className="flex gap-1 mb-4">
        <input
          onFocus={onFocusAdd}
          placeholder="add todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {/* SHOW TODO */}
      <div className="">
        {todos.length > 0 ? (
          <>
            <div className="h-8 flex justify-between items-center px-2 rounded-lg py-1 mb-2">
              {/* TODO CHECK */}
              <div>
                <input
                  title="checkAll"
                  type="checkbox"
                  id="checkAllData"
                  checked={checkedAll}
                  className="mr-2"
                  onChange={checkAll}
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
                      setMsg("");
                      setErr("");
                    }}
                  >
                    Delete Checked
                  </button>
                  <Todo1ModaldelAll
                    checkedLength={checkedLength}
                    todos={todos}
                    delCheck={delCheck}
                    setDelCheck={setDelCheck}
                    deleteChecked={deleteChecked}
                  />
                </>
              )}
            </div>

            {/* TODO LIST */}
            <div className="space-y-1">
              {todos
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((item, i) => (
                  <Todo1List
                    key={i}
                    item={item}
                    delId={delId}
                    setDelId={setDelId}
                    delTodo={delTodo}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    editTodo={editTodo}
                    setMsg={setMsg}
                    setErr={setErr}
                    checkTodo={checkTodo}
                  />
                ))}
            </div>
          </>
        ) : (
          <div className="text-center italic mt-4">Todo is empty</div>
        )}
      </div>
    </Layout>
  );
}
