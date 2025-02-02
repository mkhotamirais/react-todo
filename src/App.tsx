import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import { HelmetProvider } from "react-helmet-async";
import Todo1 from "./pages/todo1/Todo1";
import Todo2 from "./pages/todo2/Todo2";
import Todo3 from "./pages/todo3/Todo3";
import Todo4 from "./pages/todo4/Todo4";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo1" element={<Todo1 />} />
          <Route path="/todo2" element={<Todo2 />} />
          <Route path="/todo3" element={<Todo3 />} />
          <Route path="/todo4" element={<Todo4 />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
