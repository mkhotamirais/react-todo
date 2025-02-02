import { Link } from "react-router";
import DynamicHead from "../components/DynamicHead";
import Layout from "../components/Layout";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const todos = t("todos", { returnObjects: true }) as { title: string; description: string; href: string }[];

  return (
    <Layout>
      <DynamicHead />
      <div className="grid">
        <div className="mb-8">
          <h1 className="title">{t("home.title")}</h1>
          <p className="description">{t("home.description")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 smgap-4">
          {todos.map((item, i) => (
            <div key={i} className="shadow-md p-4 rounded-md flex flex-col">
              <h2 className="title">{item.title}</h2>
              <p className="description grow pb-4">{item.description}</p>
              <Link to={item.href} type="button" className="btn">
                {t("all.view")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
