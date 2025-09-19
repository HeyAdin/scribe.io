import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { blogSchema } from '@adin.dev/common';
import { updateBlogSchema } from '@adin.dev/common';
const blog = new Hono<{
    Bindings: {
        SECRET: string
    },
    Variables: {
        prisma: any,
        userId: string
    }
}>();

// Authorization Middleware
blog.use('/*', async (context, next) => {
    try {
        const prisma = context.get("prisma");
        const header = context.req.header('Authorization') || "";
        const token = header.startsWith('Bearer') ? header.split(" ")[1] : "";
        if (!token) {
            const error = new Error("auth token required");
            throw error;
        }
        const decoded = await verify(token, context.env.SECRET);
        const id: string | any = decoded.id;
        const userExist = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!userExist) {
            const error = new Error("Authorization failed no user found");
            throw error;
        }
        context.set("userId", userExist.id);
        await next();
    }
    catch (e: any) {
        context.status(403);
        return context.json({ success: false, msg: e.message });
    }
})

// Create a Blog
blog.post('/', async (context) => {
    try {
        const payload = await context.req.json();
        const response = blogSchema.safeParse(payload);
        if (!response.success) {
            console.log(response);
            const error = new Error(response.error.issues[0].message);
            throw error;
        }
        const prisma = context.get("prisma");
        const id = context.get("userId");
        const createBlog = await prisma.blog.create({
            data: {
                title: payload.title,
                content: payload.content,
                userId: id
            }
        })
        return context.json({ success: true, msg: "blog created ", data: createBlog.id });
    }
    catch (e: any) {
        if (e instanceof Error) {
            context.status(422);
            return context.json({ success: false, msg: e.message });
        }
        return context.json({ success: false, msg: "unknow error occured" });
    }
});


// Update the blog
blog.put('/:id', async (context) => {
    try {
        const payload = await context.req.json();
        const response = updateBlogSchema.safeParse(payload);
        if (!response.success) {
            const error = new Error(response.error.issues[0].message);
            throw error;
        }
        const parsedPayload = response.data;
        const id = context.req.param("id");
        const prisma = context.get("prisma");
        if (Object.keys(parsedPayload).length == 0) {
            const error = new Error("empty inputs");
            throw error;
        }
        console.log(id);
        const userId = context.get("userId");
        const updateBlog = await prisma.blog.update({
            where: {
                id,
                userId
            },
            data: parsedPayload
        });
        return context.json({ success: true, msg: "blog updated", data: updateBlog.id });
    }
    catch (e: any) {
        if (e instanceof Error) {
            context.status(422);
            return context.json({ success: false, msg: e.message });
        }
        context.status(503);
        return context.json({ success: false, msg: "unknow error occured" });
    }
});

// get the blog
blog.get('/:id', async (context) => {
    try {
        const prisma = context.get("prisma");
        const id = context.req.param("id");
        const getBlog = await prisma.blog.findUnique({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                user: {
                    select: {
                        fname: true,
                        lname: true
                    }
                },
                createdAt: true
            }
        });
        if (!getBlog) {
            const error = new Error("no blog found with this id");
            throw error;
        }
        return context.json({ success: true, msg: "your blog", data: getBlog });
    }
    catch (e: any) {
        if (e instanceof Error) { return context.json({ success: false, msg: e.message }); }
        return context.json({ success: false, msg: "unknow error occured" });
    }
});

blog.get('/', async (context) => {
    try {
        const prisma = context.get("prisma");
        const allBlogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                user: {
                    select: {
                        fname: true,
                        lname: true,
                    }
                },
                createdAt: true
            }
        });
        if (!allBlogs) {
            const error = new Error("no blogs found");
        }
        return context.json({ success: true, msg: "all the blogs ", data: allBlogs });
    }
    catch (e: any) {

        if (e instanceof Error) { return context.json({ success: false, msg: e.message }); }
        return context.json({ success: false, msg: "unknow error occured" });
    }
});

export default blog;