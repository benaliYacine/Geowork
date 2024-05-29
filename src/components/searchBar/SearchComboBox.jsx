import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
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

const SearchComboBox = ({
    control,
    name,
    label,
    isExpanded,
    itemList,
    placeholder,
    full = true,
    popoverRefs,
}) => {
    const popoverContentRef = useRef(null);

    useEffect(() => {
        if (popoverRefs) {
            popoverRefs.current.push(popoverContentRef.current);
        }
        return () => {
            if (popoverRefs) {
                popoverRefs.current = popoverRefs.current.filter(
                    (ref) => ref !== popoverContentRef.current
                );
            }
        };
    }, [popoverRefs]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <div
                                    className={cn(
                                        " h-fit py-2 px-8 rounded-full cursor-pointer",
                                        full && "w-max",
                                        !isExpanded && "py-0 px-2",
                                        isExpanded &&
                                            "flex flex-col gap-1 hover:bg-bg"
                                    )}
                                >
                                    <FormLabel className=" text-md font-medium cursor-pointer">
                                        {label}
                                    </FormLabel>
                                    <p className=" text-sm font-normal">
                                        {field.value
                                            ? itemList.find(
                                                  (item) =>
                                                      item.value === field.value
                                              )?.label
                                            : placeholder}
                                    </p>
                                </div>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            ref={popoverContentRef}
                            className="flex flex-col w-full p-0 shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]"
                        >
                            <Command>
                                <CommandEmpty>No item found.</CommandEmpty>
                                <CommandGroup>
                                    <ScrollArea
                                        className={cn(
                                            "w-full rounded-md",
                                            itemList.length < 9
                                                ? "h-fit"
                                                : "h-48"
                                        )}
                                    >
                                        {itemList.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.label}
                                                onSelect={() => {
                                                    field.onChange(item.value); // Update the value using react-hook-form's onChange
                                                }}
                                            >
                                                <Check
                                                    className={`mr-2 h-4 w-4 ${
                                                        item.value ===
                                                        field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    }`}
                                                />
                                                {item.label}
                                            </CommandItem>
                                        ))}
                                    </ScrollArea>
                                </CommandGroup>
                                <CommandInput
                                    placeholder={`Search ${label.toLowerCase()}...`}
                                />
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SearchComboBox;
