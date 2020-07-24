import cookieParser from "cookie-parser";
import "dotenv/config";
import { GraphQLServer } from "graphql-yoga";
import { CBD } from "./db";
import { seedData } from "./fakeDB";
import { models, ModelsType } from "./models";
import { resolvers, typeDefs } from "./modules";

export interface IContext {
  models: ModelsType;
  req: Express.Request;
  res: Express.Response;
}

const port = process.env.PORT || 5000;
const dbUri = process.env.MONGODB_URI || "";
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request: req, response: res }): IContext => ({
    models,
    req,
    res,
  }),
});
server.express.use(cookieParser(process.env.COOKIE_SECRET || "secret"));
server.express.use(async (req: any, res: any, next: any) => {
  const user = await models.User.findById(req.signedCookies.viewer);
  req.user = user;
  next();
});

CBD(dbUri)
  .then(() =>
    server.start({
      port,
      endpoint: "/api/v1",
      playground: "/playground",
    })
  )
  .then(() => seedData(models))
  .then(() => {
    console.log("[TinyHouse] Database connection established!");
    console.log(
      `[TinyHouse] The api server is running on http://localhost:${port}/playground!`
    );
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
