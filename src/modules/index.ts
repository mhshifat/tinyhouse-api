import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { join } from "path";

export const typeDefs = mergeTypeDefs(
  loadFilesSync(join(__dirname, "./**/schema.gql"), {
    extensions: [".gql"],
  })
);

export const resolvers = mergeResolvers(
  loadFilesSync(join(__dirname, "./**/resolvers.ts"), {
    extensions: [".ts"],
  })
);
