import { BookingModel } from "./Booking";
import { ListingModel } from "./Listing";
import { UserModel } from "./User";

export const models = {
  Listing: ListingModel,
  User: UserModel,
  Booking: BookingModel,
};

export type ModelsType = typeof models;
