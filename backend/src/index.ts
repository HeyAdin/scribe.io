import { Hono } from 'hono';
import user from './controller/userRouter';
import blog from './controller/blogRouter';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
  },
  Variables: {
    prisma: any
  }
}>();
app.use('/api/v1/*', cors())
app.use('/api/v1/*', async (context, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: context.env.DATABASE_URL,
    }).$extends(withAccelerate());
    context.set("prisma", prisma);
    console.log("connected to database");
    await next();
  }
  catch (e: any) {
    return context.json({ success: false, msg: e.message });
  }
});

// app.onError((err, c) => {
//   return c.json({ success: false, error: err.message }, 400);
// });

app.route('/api/v1/blog', blog);
app.route('/api/v1/user', user);


export default app
