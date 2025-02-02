import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Lang() {
  const { i18n } = useTranslation();

  const language = [
    { abbr: "id", name: "Indonesia" },
    { abbr: "en", name: "English" },
  ];

  return (
    <div className="z-10 relative group transition rounded-md">
      <button type="button" className="flex items-center text-sm gap-2 font-medium">
        {i18n.language === "en" ? <span>EN</span> : <span>ID</span>}
        <FaChevronDown className="text-[0.60rem] group-hover:rotate-180 transition group-hover:text-blue-500" />
      </button>
      <div className="absolute hidden group-hover:block pt-2 right-0">
        <div className="shadow-lg flex flex-col items-start gap-2 rounded-md p-2 min-w-max bg-white">
          {language.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => i18n.changeLanguage(item.abbr)}
              className={`hover:text-blue-500 cursor-pointer ${i18n.language === item.abbr ? "text-blue-500" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
