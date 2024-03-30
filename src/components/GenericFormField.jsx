// components/GenericFormField.jsx
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const GenericFormField = ({ control, name, label, placeholder, type = "text" }) => (
    <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...field} placeholder={placeholder} type={type} className="w-full" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default GenericFormField;
