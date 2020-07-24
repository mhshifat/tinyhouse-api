import { FilterListingEnum, Resolvers } from "../../types/graphql";

export const resolvers: Resolvers = {
  Query: {
    // @ts-ignore
    getListing: async (_, { id }, { models }) => models.Listing.findById(id),
    // @ts-ignore
    getListings: async (_, { page, limit, filterListing }, { models }) => {
      const listings = await models.Listing.find({})
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({
          price:
            filterListing === FilterListingEnum.PriceLowToHigh
              ? 1
              : filterListing === FilterListingEnum.PriceHighToLow
              ? -1
              : 1,
        });

      return {
        total: listings.length,
        result: listings,
      };
    },
  },
  Listing: {
    bookingIndex: (parent) => JSON.stringify(parent.bookingIndex || {}),
    bookings: async (parent, { limit, page }, { models, req }: any) => {
      const authUser = req.user;
      if (authUser && authUser._id !== parent.host)
        return { total: 0, result: [] };
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
    // @ts-ignore
    host: async (parent, _, { models }) => {
      const host = await models.User.findOne({
        _id: parent.host,
      });
      if (!host) throw new Error("Something went wrong!");
      return host;
    },
  },
};
