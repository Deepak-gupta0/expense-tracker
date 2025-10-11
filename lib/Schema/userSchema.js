import * as z from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(3, "Name field should contain more than 3 character").max(50, "Name field should contain less than 50 character"),
  email: z.email("Invalid Email"),
  password : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password should be strong. should include Number,Capital and Small letter")
});