import { z } from "zod"  
const signUpSchema = z.object({
    name: z.string().min(1, { message: "please enter your name" }),
    username:z.string().min(1).max(50),
    email: z.string().min(1, { message: "email is required" }).email(),
    password: z.string().min(8, { message: "" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/,
            { message: "password should contain special character" }),
    confirmPassword:z.string()
    
})
    .refine((input) => input.password === input.confirmPassword,
    {
        message: "password and confirmPassword is not match",
        path: ["confrimPassword"]
    })
    export default  signUpSchema