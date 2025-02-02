import Layout from "../../components/Layout";
import { SnackbarProvider } from "notistack";
import Todo2Provider from "./Todo2Provider";
import Todo2Home from "./Todo2Home";
import DynamicHead from "../../components/DynamicHead";

export default function Todo2() {
  return (
    <Layout>
      <DynamicHead title="React Todo - Todo2" />

      <Todo2Provider>
        <Todo2Home />
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} />
      </Todo2Provider>
    </Layout>
  );
}
