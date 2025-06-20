// declaration.ts
import { Entry, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export type PortfolioPageFields = {
  sys: string;
  title: string;
  body?: Document;
  slug: string;
  mainImage?: Asset;
  gallery?: Array<Asset>;
  servicesList?: Array<string>;
  contentTypeId: string;
};

export type PortfolioPageEntry = Entry<PortfolioPageFields>;
type PortfolioPageSkeleton = EntrySkeletonType<
  PortfolioPageFields,
  'portfolioPage'
>;
export type PortfolioPageEntrySkeleton = PortfolioPageSkeleton;