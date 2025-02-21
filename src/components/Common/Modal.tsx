"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Scroll Disable
    } else {
      document.body.style.overflow = "auto"; // Scroll Enable
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          {/* Close Button (Now inside the modal) */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-500 h-8 w-8 flex items-center justify-center text-white rounded-full text-lg"
          >
            <FaTimes />
          </button>

          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
