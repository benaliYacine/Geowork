// components/PasswordFormField.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GenericFormField from "./GenericFormField";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const PasswordFormField = ({ control, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      {...field}
                      className="w-full pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      {showPassword ? (
                        <Eye
                          className="m-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <EyeOff
                          className="m-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  );
};

export default PasswordFormField;
