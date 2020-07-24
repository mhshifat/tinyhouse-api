import { Document, model, Schema } from "mongoose";
import { ListingDocumentType } from "../../fakeDB/data/listings";
import { ListingType } from "../../types/graphql";

const listingSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      enum: [ListingType.Apartment, ListingType.House],
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    bookingsIndex: Schema.Types.Mixed,
    price: {
      type: Number,
      required: true,
    },
    numOfGuests: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ListingModel = model<ListingDocumentType & Document>(
  "Listing",
  listingSchema
);
