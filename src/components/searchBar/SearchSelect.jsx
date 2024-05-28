import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchSelect = ({ control, name, label, itemList, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="focus:outline-none w-full">
              <FormControl>
                <div className="flex flex-col gap-1 hover:bg-bg h-fit py-2 pl-8 pr-16 rounded-full  cursor-pointer ">
                  <FormLabel className=" text-md font-medium cursor-pointer">
                    {label}
                  </FormLabel>
                  <p className=" text-sm font-normal">
                    <SelectValue placeholder={placeholder} />
                  </p>
                </div>
              </FormControl>
            </SelectTrigger>
            <SelectContent className="flex flex-col w-full p-0 shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
              <SelectItem value="Jobs" >Jobs</SelectItem>
              <SelectItem value="Geoworkers">Geoworkers</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchSelect;
