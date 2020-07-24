import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../index';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AppInfo = {
  __typename?: 'AppInfo';
  api: Scalars['String'];
  version: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID'];
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
  tenant: User;
  listing: Listing;
};

export type BookingsObj = {
  __typename?: 'BookingsObj';
  total: Scalars['Int'];
  result: Array<Booking>;
};

export enum FilterListingEnum {
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH',
  PriceHighToLow = 'PRICE_HIGH_TO_LOW'
}

export type Listing = {
  __typename?: 'Listing';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  host: User;
  type: ListingType;
  address: Scalars['String'];
  country: Scalars['String'];
  admin: Scalars['String'];
  city: Scalars['String'];
  bookings: BookingsObj;
  bookingIndex: Scalars['String'];
  price: Scalars['Int'];
  numOfGuests: Scalars['Int'];
};


export type ListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type ListingsObj = {
  __typename?: 'ListingsObj';
  total: Scalars['Int'];
  result: Array<Listing>;
};

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type LoginWithGoogleInput = {
  contact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  input: LoginWithGoogleInput;
};

export type Query = {
  __typename?: 'Query';
  appInfo: AppInfo;
  getBookings: BookingsObj;
  getListing?: Maybe<Listing>;
  getListings: ListingsObj;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryGetBookingsArgs = {
  limit: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryGetListingArgs = {
  id: Scalars['ID'];
};


export type QueryGetListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
  filterListing: FilterListingEnum;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  income?: Maybe<Scalars['Int']>;
  bookings?: Maybe<BookingsObj>;
  listings?: Maybe<ListingsObj>;
};


export type UserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  AppInfo: ResolverTypeWrapper<AppInfo>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BookingsObj: ResolverTypeWrapper<BookingsObj>;
  Booking: ResolverTypeWrapper<Booking>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ListingsObj: ResolverTypeWrapper<ListingsObj>;
  Listing: ResolverTypeWrapper<Listing>;
  ListingType: ListingType;
  FilterListingEnum: FilterListingEnum;
  Mutation: ResolverTypeWrapper<{}>;
  LoginWithGoogleInput: LoginWithGoogleInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  AppInfo: AppInfo;
  String: Scalars['String'];
  Int: Scalars['Int'];
  BookingsObj: BookingsObj;
  Booking: Booking;
  ID: Scalars['ID'];
  User: User;
  Boolean: Scalars['Boolean'];
  ListingsObj: ListingsObj;
  Listing: Listing;
  Mutation: {};
  LoginWithGoogleInput: LoginWithGoogleInput;
};

export type AppInfoResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AppInfo'] = ResolversParentTypes['AppInfo']> = {
  api?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BookingResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  checkIn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  checkOut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenant?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  listing?: Resolver<ResolversTypes['Listing'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BookingsObjResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BookingsObj'] = ResolversParentTypes['BookingsObj']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ListingResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Listing'] = ResolversParentTypes['Listing']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  host?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ListingType'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookings?: Resolver<ResolversTypes['BookingsObj'], ParentType, ContextType, RequireFields<ListingBookingsArgs, 'limit' | 'page'>>;
  bookingIndex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numOfGuests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ListingsObjResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ListingsObj'] = ResolversParentTypes['ListingsObj']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Listing']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  appInfo?: Resolver<ResolversTypes['AppInfo'], ParentType, ContextType>;
  getBookings?: Resolver<ResolversTypes['BookingsObj'], ParentType, ContextType, RequireFields<QueryGetBookingsArgs, 'limit'>>;
  getListing?: Resolver<Maybe<ResolversTypes['Listing']>, ParentType, ContextType, RequireFields<QueryGetListingArgs, 'id'>>;
  getListings?: Resolver<ResolversTypes['ListingsObj'], ParentType, ContextType, RequireFields<QueryGetListingsArgs, 'limit' | 'page' | 'filterListing'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasWallet?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  income?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bookings?: Resolver<Maybe<ResolversTypes['BookingsObj']>, ParentType, ContextType, RequireFields<UserBookingsArgs, 'limit' | 'page'>>;
  listings?: Resolver<Maybe<ResolversTypes['ListingsObj']>, ParentType, ContextType, RequireFields<UserListingsArgs, 'limit' | 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = IContext> = {
  AppInfo?: AppInfoResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  BookingsObj?: BookingsObjResolvers<ContextType>;
  Listing?: ListingResolvers<ContextType>;
  ListingsObj?: ListingsObjResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = IContext> = Resolvers<ContextType>;
