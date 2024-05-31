// components/AlertMessage.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CircleCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

const AlertMessage = ({
    showAlert,
    message,
    variant = "default",
    onClose,
    className,
}) => {
    const Icon = variant === "destructive" ? AlertCircle : CircleCheck;

    const animationVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -100 },
    };

    return (
        <AnimatePresence>
            {showAlert && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animationVariants}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        " fixed top-10 z-20  left-0 right-0 mx-auto mb-4 ",
                        className
                    )}
                >
                    <Alert
                        variant={variant}
                        className=" max-w-3xl min-w-96 w-fit mx-auto"
                    >
                        <Icon className="h-5 w-5 " />
                        {variant === "destructive" && (
                            <AlertTitle>Error</AlertTitle>
                        )}
                        <AlertDescription className="mr-5">{message}</AlertDescription>
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AlertMessage;
