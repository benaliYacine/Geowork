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

const SearchSelect = ({
    control,
    name,
    label,
    full,
    isExpanded = true,
    itemList,
    placeholder,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(full ? "grow-[1] w-full lg:w-0" : "w-full")}
                >
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="focus:outline-none w-full">
                            <FormControl>
                                <div
                                    className={cn(
                                        " h-fit py-2 px-4 rounded-full  cursor-pointer ",
                                        !isExpanded && "py-0 px-2",
                                        !full && "lg:pr-16 lg:pl-8 px-8",
                                        isExpanded &&
                                            "flex lg:flex-col lg:items-start justify-center items-center gap-4 lg:gap-1 hover:bg-bg"
                                    )}
                                >
                                    <FormLabel className=" text-md font-medium cursor-pointer text-end flex-1">
                                        {label}
                                    </FormLabel>
                                    <p className=" text-sm font-normal flex-1 text-start">
                                        <SelectValue
                                            placeholder={placeholder}
                                        />
                                    </p>
                                </div>
                            </FormControl>
                        </SelectTrigger>
                        <SelectContent className="flex flex-col w-full p-0 shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
                            <SelectItem value="Jobs">Jobs</SelectItem>
                            <SelectItem value="Geoworkers">
                                Geoworkers
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SearchSelect;
