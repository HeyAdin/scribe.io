import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import * as zod from "zod";
const blog = new Hono<{
    Bindings: {
        SECRET: string
    },
    Variables: {
        prisma: any,
        userId : string
    }
}>();

blog.use('/*', async (context, next) => {
    try {
        const prisma  = context.get("prisma");
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
        context.set("userId" , userExist.id);
        await next();
    }
    catch (e: any) {
        return context.json({ success: false, msg: e.message });
    }
})

// create a blog
blog.post('/', async (context) => {
    const blogSchema = zod.object({
        title : zod.string().min(1 , {message : "blog post's title should be minimum of 1 char"}),
        content : zod.string().min(1,{message : "descripton's length is required"}),
        published : zod.boolean().default(false),
        authorId :zod.string()
    });
    const payload = await context.req.json();
    const prisma = context.get("prisma");
    const id = context.get("userId");
    const createBlog = await prisma.blog.create({
        data : {
            title : payload.title,
            content : payload.content,
            userId : id
        }
    })
    return context.json({success : true , msg : "blog created ", data : createBlog.id});
});


// Update the blog
blog.put('/:id', (context) => {
    return context.text("blog page put api");
});

// get the blog
blog.get('/:id', (context) => {
    return context.text('Assalam Alaikum Hono!');
});

blog.get('/', (context) => {
    return context.text("all the blogs should be returned from this api");
});

export default blog;