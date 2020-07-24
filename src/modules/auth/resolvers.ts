import crypto from "crypto";
import { ModelsType } from "../../models/index";
import { Google } from "../../services/google/index";
import { Resolvers } from "../../types/graphql";

export const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "production",
};

export const resolvers: Resolvers = {
  Query: {
    // @ts-ignore
    me: async (_, __, { req }: { req: any }) => {
      const user = req.user;
      if (!user) return null;
      return user;
    },
    // @ts-ignore
    getUser: async (_, { id }, { models, req }: any) => {
      const user = await models.User.findById(id);
      if (!user) return null;
      return user;
    },
  },
  Mutation: {
    // @ts-ignore
    login: async (
      _,
      { input },
      { models, res, req }: { models: ModelsType; res: any; req: any }
    ) => {
      const token = crypto.randomBytes(16).toString("hex");
      const user =
        input && input.contact
          ? await Google.login(token, input, models)
          : undefined;
      if (!user) return null;
      res.cookie("viewer", user._id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      return user;
    },
    logout: async (_, __, { res }: any) => {
      res.clearCookie("viewer", cookieOptions);
      return true;
    },
  },
  User: {
    hasWallet: (parent) => {
      const { walletId }: any = parent;
      return walletId ? !!walletId.trim() : false;
    },
    income: (parent, _, { req }: any) => {
      const { income }: any = parent;
      return req.user && req.user._id === parent._id
        ? income <= 0
          ? undefined
          : income
        : undefined;
    },
    bookings: async (parent, { limit, page }, { models }) => {
      const bookings = await models.Booking.find({
        _id: { $in: parent.bookings },
      })
        .limit(limit)
        .skip((page - 1) * limit);
      return {
        total: bookings.length,
        result: bookings as any,
      };
    },
    listings: async (parent, _, { models }) => {
      const listings = await models.Listing.find({
        _id: { $in: parent.listings },
      });
      return {
        total: listings.length,
        result: listings as any,
      };
    },
  },
};
