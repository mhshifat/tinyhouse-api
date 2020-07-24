import { ModelsType } from "../models";
import { listings } from "./data/listings";
import { users } from "./data/users";

export const seedData = async (models: ModelsType): Promise<boolean> => {
  await Promise.all([
    models.User.deleteMany({}),
    models.User.create(users),
    models.Listing.deleteMany({}),
    models.Listing.create(listings),
  ]);
  return true;
};
