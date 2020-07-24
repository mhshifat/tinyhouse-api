import { Document, model, Schema } from "mongoose";
import { UserDocumentType } from "../../fakeDB/data/users";

const userSchema: Schema = new Schema(
  {
    token: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
    },
    income: Number,
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocumentType & Document>("User", userSchema);
