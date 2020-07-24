import { Resolvers } from "../../types/graphql";

export const resolvers: Resolvers = {
  Query: {
    getBookings: () => ({ total: 0, result: [] }),
  },
};
