import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { prismaMiddleware } from './middlewares/initPrismaMiddleware';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	},
  Variables : {
    prisma : any
  }
}>();

app.use("*",prismaMiddleware);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get("/signup", async (c) => {
  const prisma = c.get("prisma");
  // const body = await c.req.json();

  const res = await prisma.user.create({
    data : {
      email : "v1@gmail.com",
      name : "unhvksnvkud"
    },
    select : {
      id : true
    }
  })
  return c.json({ "msg": res })
})
export default app
