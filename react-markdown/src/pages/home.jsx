import React from "react";
import Navbar from "../components/Navbar";
import Markdown from "../components/Markdown";
import Preview from "../components/Preview";
import Sidebar from "../components/Sidebar";
import { useMarkdownContext } from "../context/markdownContext";

const Home = () => {
  const { theme, preview } = useMarkdownContext();
  return (
    <div
      className={
        theme
          ? "w-screen h-screen max-w-[1550px] m-auto"
          : "w-screen h-screen max-w-[1550px] m-auto bg-[#151619]"
      }
    >
      <Sidebar />

      <Navbar />
      <div
        className={
          !preview
            ? "grid w-full grid-cols-1  md:grid-cols-2 h-mobile h-desktop-0  md:h-desktop md:h-mobile-0"
            : "grid w-full md:grid-cols-1  h-mobile h-desktop-0 md:h-desktop md:h-mobile-0"
        }
      >
        <Markdown />
        <Preview />
      </div>
    </div>
  );
};

export default Home;
