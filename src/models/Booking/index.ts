import { ObjectID } from "mongodb";
import { Document, model, Schema } from "mongoose";
import { Booking } from "../../types/graphql";

const bookingSchema: Schema = new Schema(
  {
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  },
  {
    timestamps: true,
  }
);

type ModifiedBookingType = Omit<
  Booking,
  "_id" | "__typename" | "tenant" | "listing"
>;
type BookingDocumentType = ModifiedBookingType & {
  _id: ObjectID;
  tenant: ObjectID;
  Listing: ObjectID;
};
export const BookingModel = model<BookingDocumentType & Document>(
  "Booking",
  bookingSchema
);
