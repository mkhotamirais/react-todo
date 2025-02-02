import Layout from "../../components/Layout";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Todo3Home from "./Todo3Home";

export default function Todo3() {
  return (
    <Provider store={store}>
      <Toaster />
      <Layout>
        <Todo3Home />
      </Layout>
    </Provider>
  );
}
