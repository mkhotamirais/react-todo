import { Helmet } from "react-helmet-async";

interface DynamicHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function DynamicHead({ title, description, keywords }: DynamicHeadProps) {
  return (
    <Helmet>
      <title>{title ?? "React Todo"}</title>

      <meta name="description" content={description ?? "React Todo description"} />
      <meta name="keywords" content={keywords ?? "React Todo keywords"} />
    </Helmet>
  );
}
