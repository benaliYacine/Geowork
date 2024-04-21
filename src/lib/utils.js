import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function getYearsRange (startYear, endYear) {
  const yearItems = [];
  for (let year = startYear; year <= endYear; year++) {
    yearItems.push({
      value: year,
      label: year.toString(),
    });
  }
  return yearItems;
};

export function getInitials(name) {
  // Split the name by spaces into an array
  const parts = name.split(" ");

  // Get the first letter of the first part and the first letter of the last part
  const initials = parts[0][0] + parts[1][0];

  // Return the initials in uppercase
  return initials.toUpperCase();
}

//----------zod : ex

// const zod = require("zod");

// // Define a schema
// const UserSchema = zod.object({
//   name: zod.string(),
//   age: zod.number(),
//   email: zod.string().email(),
// });

// // Data to be validated
// const userData = {
//   name: "John Doe",
//   age: 30,
//   email: "john@example.com",
// };

// // Validate the data
// const validationResult = UserSchema.safeParse(userData);

// if (validationResult.success) {
//   console.log("Validation succeeded:", validationResult.data);
// } else {
//   console.error("Validation failed:", validationResult.error.issues);
// }
