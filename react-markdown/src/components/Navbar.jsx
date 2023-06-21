import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Menu } from "../../assets/icon-menu.svg";
import { ReactComponent as Document } from "../../assets/icon-document.svg";
import { ReactComponent as Trash } from "../../assets/icon-delete.svg";
import { ReactComponent as Save } from "../../assets/icon-save.svg";
import { useMarkdownContext } from "../context/markdownContext";
import { CustomModal } from "../modal/DeleteDocument";
import { toast } from "react-toastify";

const Navbar = () => {
  const { open, setOpen, markdownData, allDocuments, setAllDocuments, theme } =
    useMarkdownContext();

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "light" : "dark",
    });
  };

  const notifyAlert = (message) => {
    toast.warning(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "light" : "dark",
    });
  };

  function saveChanges() {
    setOpen(false);
    if (allDocuments.length === 0) {
      notifyAlert("Please Create A New Docment First");
      return;
    }
    setAllDocuments((prev) => {
      return prev.map((curr) => {
        if (curr.id === markdownData.id) {
          return {
            ...curr,
            content: markdownData.content,
          };
        } else {
          return curr;
        }
      });
    });

    notifySuccess("Saved Changes!");
  }
  return (
    <div className="h-[3.5rem] md:h-[4.5rem] w-full bg-[#2b2d31] flex items-center justify-between">
      <div className="flex items-center justify-between left">
        <div
          className="menu w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] bg-[#35393f] flex justify-center items-center cursor-pointer hover:bg-[#e46643]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Menu />
        </div>

        <div className="flex gap-8 md:ml-8 md:items-center">
          <div className="hidden md:block logo">
            <Logo />
          </div>

          <div className="border-0 md:border-l md:border-[#7c8187]">
            <div className="flex items-center gap-3 ml-4 md:gap-5 md:ml-8">
              <Document />
              <div className="text-[1rem]">
                <div className="md:block md:text-[#7c8187] md:font-normal hidden">
                  Document Name
                </div>
                <div className="text-white">{markdownData.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 right">
        <CustomModal>
          <div className="cursor-pointer dlt-btn">
            <Trash />
          </div>
        </CustomModal>

        <div
          className="save-btn flex  items-center gap-1 mr-4 bg-[#e46643] text-white px-3 py-2 md:px-4 md:py-2 rounded-md text-[1rem] cursor-pointer hover:bg-[#f39765]"
          onClick={saveChanges}
        >
          <Save />
          <div className="hidden md:gap-1 md:flex">
            <span>Save</span> <span>Changes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
