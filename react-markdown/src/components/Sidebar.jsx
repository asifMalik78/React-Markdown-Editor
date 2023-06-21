import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Document } from "../../assets/icon-document.svg";
import { ReactComponent as CloseMenu } from "../../assets/icon-close.svg";
import { ReactComponent as Sun } from "../../assets/icon-light-mode.svg";
import { ReactComponent as Moon } from "../../assets/icon-dark-mode.svg";
import { useMarkdownContext } from "../context/markdownContext";
import { CustomModal } from "../modal/CreateDocument";

const Sidebar = () => {
  const { open, setOpen, theme, setTheme, allDocuments, setMarkDownData } =
    useMarkdownContext();

  function selectFile(curr) {
    setMarkDownData(curr);
    setOpen(!open);
  }
  return (
    <div
      className={
        open
          ? "bg-[#1d1f22] h-screen w-[17rem] px-6 pt-6 absolute sidebar-open ease-in duration-300"
          : "bg-[#1d1f22] h-screen w-[17rem] px-6 pt-6 absolute sidebar-close ease-in duration-300"
      }
    >
      <div className="flex items-center justify-between mb-8">
        <Logo />
        <CloseMenu
          className="cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>

      <div className="flex flex-col h-[90%] justify-between">
        <div className="flex flex-col">
          <div className="font-medium text-[#7c8187] uppercase mb-8">
            My Documents
          </div>

          <CustomModal>
            <button className="bg-[#e46643] hover:bg-[#f39765] w-full px-2 py-3 rounded-lg text-white mb-5">
              + New Document
            </button>
          </CustomModal>
          <div className="flex flex-col h-[27rem] gap-4 overflow-y-auto">
            {allDocuments?.map((curr) => {
              return (
                <div
                  className="flex items-center gap-4"
                  key={curr.id}
                  onClick={() => selectFile(curr)}
                >
                  <Document />
                  <div className="cursor-pointer">
                    <div className="text-[#7c8187]">{curr.createdAt}</div>
                    <p className="text-white hover:text-[#f46643]">
                      {curr.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Moon className={`${!theme ? "fill-white" : "fill-[#4f555c]"}`} />
          <div
            className="relative flex items-center w-12 h-6 cursor-pointer bg-[#5a6069] rounded-2xl"
            onClick={() => setTheme(!theme)}
          >
            <span
              className={`block bg-white rounded-full w-3 h-3 absolute ${
                !theme ? "translate-x-2" : "translate-x-7"
              } transition-all`}
            />
          </div>
          <Sun className={`${theme ? "fill-white" : "fill-[#4f555c]"}`} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
