import { useState } from "react";
import Modal from "react-modal";
import { useMarkdownContext } from "../context/markdownContext";
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
  const { open, setOpen, markdownData, theme, allDocuments, setAllDocuments } =
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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteFile() {
    let allDocumentsFiltered = allDocuments?.filter(
      (curr) => curr.id !== markdownData.id
    );
    setAllDocuments(allDocumentsFiltered);
    notifySuccess("Deleted Successfully!");
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
        <div className="flex flex-col px-4 py-6 shadow-sm">
          <h2 className="mb-2 font-sans text-xl text-white ">
            Delete this document?
          </h2>
          <p className="text-[#c0c3c6] mb-5 tracking-tighter text-sm text-left">
            Are you sure you want to delete the ‘welcome.md’ document and its
            contents? This action cannot be reversed.
          </p>
          <button
            className="bg-[#e46643] hover:bg-[#f39765]  px-7  py-2 rounded-md text-white"
            onClick={deleteFile}
          >
            Confirm & Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
