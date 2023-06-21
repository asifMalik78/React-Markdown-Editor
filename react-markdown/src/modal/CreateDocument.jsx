import { useState } from "react";
import Modal from "react-modal";
import { useMarkdownContext } from "../context/markdownContext";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba( 255, 255, 255, 0.17 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 1.5px )",
  },
  content: {
    top: "50%",
    left: "50%",
    width: "343px",
    height: "fit-content",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1d1f22",
    borderRadius: ".7rem",
    padding: "0",
    border: "none",
  },
};

Modal.setAppElement(document.getElementById("modal"));

export function CustomModal({ children }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const { setAllDocuments, theme, open, setOpen } = useMarkdownContext();

  const norifySuccess = (message) => {
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

  const notifyWarning = (message) => {
    toast.warn(message, {
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

  function openModal() {
    setOpen(!open);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function createFile() {
    if (filename.length > 0 && filename.split(".")[1] !== "md") {
      notifyWarning("Invalid Filename!");
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const createdAt = `${day}-${month}-${year}`;

    const data = {
      id: uuid(),
      createdAt,
      name: filename === "" ? "Untitled.md" : filename,
      content: "",
    };

    setAllDocuments((prev) => [...prev, data]);
    norifySuccess("Created Successfully!");
    closeModal();
  }

  return (
    <div>
      <div className="" onClick={() => openModal()}>
        {children}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-col px-5 py-6 shadow-sm">
          <h2 className="mb-2 font-sans text-xl text-white ">
            Create New Document
          </h2>
          <div className="text-[#c0c3c6] mb-1">Document Name:</div>
          <input
            className="bg-[#35393f] p-3 rounded-md focus:outline-white text-white mb-3"
            placeholder="example.md"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <button
            className="bg-[#e46643] hover:bg-[#f39765]  px-7  py-2 rounded-md text-white  mr-auto"
            onClick={createFile}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
}
