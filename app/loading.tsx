'use client';

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col h-screen items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="relative flex items-center justify-center">
                    {/* Outer Pulse Ring */}
                    <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
                    {/* Inner Spinner */}
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>

                <div className="text-center">
                    <p className="text-lg font-semibold tracking-tight text-foreground">
                        Processing Election Data
                    </p>
                    <p className="text-sm text-muted-foreground animate-pulse">
                        Securely connecting to the ballot box...
                    </p>
                </div>
            </motion.div>
        </div>
    );
}