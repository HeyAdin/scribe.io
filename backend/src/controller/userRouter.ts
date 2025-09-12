import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';
import * as zod from 'zod';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string
    },
    Variables: {
        prisma: any
    }
}>();

user.post('/signup', async (context) => {
    try {
        const prisma = context.get("prisma");
        const signupSchema = zod.object({
            email: zod.email({ message: "invalid email please give the right inputs" }),
            fname: zod.string().min(1, { message: "first name should be minimum 1 char" }),
            lname: zod.string().min(1, { message: "last name should be minimum 1 char" }),
            password: zod.string().min(6, { message: "password lenght required " }),
        });
        const payload = await context.req.json();
        const response = signupSchema.safeParse(payload);
        if (!response.success) {
            console.log(response.error);
            const error = new Error(response.error.issues[0].message);
            throw error;
        }
        const saltRound: number = 12;
        const parsedPayload = response.data;
        const plainPassword: string = parsedPayload.password;
        // const userExist = await prisma.user.findFirst({
        //   where: {
        //     email: parsedPayload.email
        //   }
        // });
        // if (userExist) {
        //   const error = new Error("user already exist please sign in");
        //   throw error;
        // }

        // No need to check user exist or not because i already have implemented unique email schema in database

        const password: string = await bcrypt.hash(plainPassword, saltRound);
        const createUser = await prisma.user.create({
            data: {
                email: parsedPayload.email,
                fname: parsedPayload.fname,
                lname: parsedPayload.lname,
                password,
            }
        });
        if (!createUser) {
            const error = new Error("error while creating user");
            throw error;
        }
        const token: string = await sign({ id: createUser.id, iat: Math.floor(Date.now() / 1000) - 10 }, context.env.SECRET);
        return context.json({ success: true, msg: "user created successfull", token });
    }
    catch (e: any) {
        console.log(e);
        if (e instanceof Error) return context.json({ success: false, msg: e.message });
        return context.json({ success: false, msg: "unknown error occured" })
    }
});

user.post('/signin', async (context) => {
    try {
        const signinSchema = zod.object({
            email: zod.email({ message: "invalid email please give the right inputs" }),
            password: zod.string().min(6, { message: "password lenght required " }),
        });

        const prisma = context.get("prisma");
        const payload = await context.req.json();
        const response = signinSchema.safeParse(payload);
        if (!response.success) {
            console.log(response.error);
            const error = new Error(response.error.issues[0].message);
            throw error;
        }
        const parsedPayload = response.data;
        const plainPassword: string = parsedPayload.password;

        const userExist = await prisma.user.findFirst({
            where: {
                email: parsedPayload.email
            }
        });

        if (!userExist) {
            const error = new Error("user doesn't exist please sign up");
            throw error;
        }

        const comparePassword: boolean = await bcrypt.compare(plainPassword, userExist.password);
        if (!comparePassword) {
            const error = new Error("incorrect password");
            throw error;
        }

        const token: string = await sign({ id: userExist.id, iat: Math.floor(Date.now() / 1000) - 10 }, context.env.SECRET);
        return context.json({ success: true, msg: "user sign in successfull", token });
    }
    catch (e: any) {
        console.log(e);
        if (e instanceof Error) return context.json({ success: false, msg: e.message });
        return context.json({ success: false, msg: "unknown error occured" })
    }
});

export default user;