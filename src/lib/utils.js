import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
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
