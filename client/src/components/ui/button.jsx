import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const buttonVariants = cva(
    "flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
    {
        variants: {
            variant: {
                default:
                    " bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: " border-2 border-input bg-background text-input",
                primary2: "text-primary bg-secondary2",
                white: " bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                title: "text-black underline-offset-4 hover:underline hover:text-primary hover:scale-100",
            },
            size: {
                default: "h-10 px-4",
                sm: "h-[31px] text-sm px-3",
                lg: "h-12 text-lg px-8",
                icon: "h-10 w-10",
                none: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    (
        {
            className,
            children,
            variant,
            size,
            noScale = false,
            loading = false,
            asChild = false,
            ...props
        },
        ref
    ) => {
        if (!asChild) {
            return (
                <motion.button
                    whileHover={{ scale: !noScale ? 1.1 : 1 }}
                    whileTap={{ scale: 1 }}
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    disabled={loading}
                    {...props}
                >
                    {loading && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {children}
                </motion.button>
            );
        } else {
            return (
                <motion.div whileHover={{ scale: noScale ? 1.1 : 1 }}>
                    <Slot
                        className={cn(
                            buttonVariants({ variant, size, className })
                        )}
                        ref={ref}
                        {...props}
                    />
                </motion.div>
            );
        }
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
