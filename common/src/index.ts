import zod from "zod";

export const blogSchema = zod.object({
    title: zod.string().min(1, { message: "blog post's title should be minimum of 1 char" }),
    content: zod.string().min(1, { message: "descripton's length is required" }),
    published: zod.boolean().default(false),
});

export const updateBlogSchema = zod.object({
    title: zod.string().min(1).optional(),
    content: zod.string().min(1, { message: "descripton's length is required" }).optional(),
    published: zod.boolean().optional()
});

export const signupSchema = zod.object({
    email: zod.email({ message: "invalid email please give the right inputs" }),
    fname: zod.string().min(1, { message: "first name should be minimum 1 char" }),
    lname: zod.string().min(1, { message: "last name should be minimum 1 char" }),
    password: zod.string().min(6, { message: "password lenght required " }),
});

export const signinSchema = zod.object({
    email: zod.email({ message: "invalid email please give the right inputs" }),
    password: zod.string().min(6, { message: "password lenght required " }),
});

export type createBlogType = zod.infer<typeof blogSchema>;
export type updateBlogType = zod.infer<typeof updateBlogSchema>;
export type userSignUpType = zod.infer<typeof signupSchema>;
export type userSignInType = zod.infer<typeof signinSchema>;