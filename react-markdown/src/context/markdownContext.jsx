import { createContext, useContext, useEffect, useState } from "react";
import { data } from "../data";
const markdownContext = createContext();

export const Provider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(false);
  const [preview, setPreview] = useState(false);
  const [markdownData, setMarkDownData] = useState(data[0] || "");
  const [allDocuments, setAllDocuments] = useState(
    JSON.parse(localStorage.getItem("docs"))
  );

  useEffect(() => {
    if (localStorage.getItem("docs") === null) {
      localStorage.setItem("docs", JSON.stringify(data));
    }

    if(allDocuments?.length > 0){
      localStorage.setItem("docs" , JSON.stringify(allDocuments));
    }
  }, [allDocuments]);

  return (
    <markdownContext.Provider
      value={{
        markdownData,
        setMarkDownData,
        open,
        setOpen,
        theme,
        setTheme,
        preview,
        setPreview,
        allDocuments,
        setAllDocuments,
      }}
    >
      {children}
    </markdownContext.Provider>
  );
};

export const useMarkdownContext = () => {
  return useContext(markdownContext);
};
