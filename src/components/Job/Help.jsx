import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, BadgeHelp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverClose,
} from "@/components/ui/popover";

function Help({ context, profile, children }) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-fit h-fit relative">
        <div className={profile ? "w-60 p-1 " : "w-80 p-1"}>
          <PopoverClose className="w-fit h-fit absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6" />
          </PopoverClose>
          <p className="text-lg text-black ">{context}</p>
          <PopoverArrow className="fill-white relative top-[-1px] scale-150" />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Help;
