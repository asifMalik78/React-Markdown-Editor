import React from "react";
import { ReactComponent as ShowPreview } from "../../assets/icon-show-preview.svg";
import { ReactComponent as HidePreview } from "../../assets/icon-hide-preview.svg";
import { useMarkdownContext } from "../context/markdownContext";


const Markdown = () => {
  const { markdownData, setMarkDownData, theme, preview, setPreview } =
    useMarkdownContext();

  function changeMarkdownData(e) {
    setMarkDownData((prev) => ({ ...prev, content: e.target.value }));
  }
  return (
    <>
      {!preview && (
        <div className={theme ? "w-full h-full" : "w-full h-full bg-[#151619]"}>
          <div
            className={
              theme
                ? `first-letter:w-full p-4 bg-[#f5f5f5] tracking-[0.2rem] text-[#7c8187] text-[0.9rem] font-medium    flex items-center justify-between`
                : `w-full p-4 bg-[#1d1f22] tracking-[0.2rem] text-[#7c8187] text-[0.9rem] font-medium  flex items-center justify-between`
            }
          >
            Markdown
            {!preview ? (
              <ShowPreview
                className="cursor-pointer md:hidden"
                onClick={() => setPreview(!preview)}
              />
            ) : (
              <HidePreview
                className="cursor-pointer md:hidden"
                onClick={() => setPreview(!preview)}
              />
            )}
          </div>
          <textarea
            className={
              theme
                ? "text-sm text-gray-800 ]  text-editor-desktop-0 text-editor-mobile md:text-editor-desktop md:text-editor-mobile-0"
                : "text-sm text-[#ccced0]  bg-[#151619] text-editor-desktop-0 text-editor-mobile md:text-editor-desktop md:text-editor-mobile-0"
            }
            value={markdownData.content}
            onChange={changeMarkdownData}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default Markdown;
