import React, { useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const overlay = useRef<HTMLDivElement>(null);

  // Close the modal if the overlay is clicked
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlay.current) {
      onClose();
    }
  };

  if (!isOpen) return null; // Don't render modal if it isn't open

  return (
    <div
      ref={overlay}
      className="fixed z-10 inset-0 bg-black/60 p-10 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-h-[80vh] w-full sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
