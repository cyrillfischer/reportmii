// src/components/VideoModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
};

export default function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-[999] 
            bg-black/30 backdrop-blur-md 
            flex items-center justify-center
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              relative bg-white rounded-2xl shadow-2xl 
              border border-gray-200 
              max-w-4xl w-[90%] overflow-hidden
            "
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="
                absolute top-3 right-3 
                p-2 rounded-full 
                bg-gray-100 hover:bg-gray-200 
                text-gray-700 transition
              "
            >
              <X size={20} />
            </button>

            {/* VIDEO */}
            <video
              src={videoSrc}
              autoPlay
              controls
              playsInline
              className="w-full h-[480px] bg-black object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
