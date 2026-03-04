'use client';

import { ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 w-full max-w-lg mx-4 bg-card border border-border rounded-xl shadow-2xl shadow-primary/10"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            <h2 id="modal-title" className="font-display font-semibold text-lg">{title}</h2>
                            <button
                                onClick={onClose}
                                // ADDED aria-label and title for accessibility
                                aria-label="Close modal"
                                title="Close"
                                className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="p-6">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;