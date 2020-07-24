import { Resolvers } from "../../types/graphql";

export const resolvers: Resolvers = {
  Query: {
    appInfo: () => ({
      api: "/api/v1",
      version: "v1",
    }),
  },
};
