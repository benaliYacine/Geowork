import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-col w-full", className)}
    {...props}
  />
));

Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-row min-w-72 h-full  rounded-md items-center justify-start",
      className
    )}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative w-fit h-full flex items-center justify-start px-4 py-2  text-sm font-medium transition-all duration-150 ease-in-out",

      "before:absolute before:left-0 before:bottom-0 before:right-0 before:h-0.5 before:transition-width before:rounded-full",
      "data-[state=active]:text-primary data-[state=active]:before:left-2 data-[state=active]:before:right-2 data-[state=active]:before:bg-primary",
      "data-[state=inactive]:text-black data-[state=inactive]:before:bg-greyCold",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "w-full  ring-offset-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
