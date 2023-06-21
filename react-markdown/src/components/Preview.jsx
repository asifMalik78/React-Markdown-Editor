import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactComponent as ShowPreview } from "../../assets/icon-show-preview.svg";
import { ReactComponent as HidePreview } from "../../assets/icon-hide-preview.svg";
import { useMarkdownContext } from "../context/markdownContext";
import remarkGfm from "remark-gfm";

const Preview = () => {
  const { markdownData, theme, setPreview, preview } = useMarkdownContext();
  return (
    <div className="w-full h-full">
      <div
        className={
          theme
            ? `first-letter:w-full p-4 bg-[#f5f5f5] tracking-[0.2rem] text-[#7c8187] text-[0.9rem] font-medium ${
                !preview ? "border-4" : "border-0"
              } border-t-0 border-b-0 border-r-0 border-gray-300 flex items-center justify-between`
            : `w-full p-4 bg-[#1d1f22] tracking-[0.2rem] text-[#7c8187] text-[0.9rem] font-medium ${
                !preview ? "border-4" : "border-0"
              } border-t-0 border-b-0 border-r-0 border-[#2b2d31] flex items-center justify-between`
        }
      >
        PREVIEW
        {!preview ? (
          <ShowPreview
            className="cursor-pointer"
            onClick={() => setPreview(!preview)}
          />
        ) : (
          <HidePreview
            className="cursor-pointer"
            onClick={() => setPreview(!preview)}
          />
        )}
      </div>
      <ReactMarkdown
        children={markdownData.content}
        remarkPlugins={[remarkGfm]}
        className={
          theme
            ? `${
                !preview
                  ? "border-l-4 w-full"
                  : "border-l-0 w-full md:w-[50%] m-auto"
              } border-gray-300 preview-markdown preview-markdown-light text-editor-desktop-0 text-editor-mobile md:text-editor-desktop md:text-editor-mobile-0`
            : `${
                !preview
                  ? "border-l-4 w-full"
                  : "border-l-0 w-full md:w-[50%] m-auto"
              } border-[#2b2d31] preview-markdown preview-markdown-dark bg-[#151619] text-editor-desktop-0 text-editor-mobile md:text-editor-desktop md:text-editor-mobile-0`
        }
      />
    </div>
  );
};

export default Preview;
