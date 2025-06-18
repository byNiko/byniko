// declaration.ts
import { Entry, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export type PortfolioPageFields = {
  sys: string;
  title: string;
  body?: Document;
  slug: string;
  mainImage?: Asset;
  fields: {
    slug: string;
    title: string;
    mainImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };

  contentTypeId: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
};

export type PortfolioPageEntry = Entry<PortfolioPageFields>;
type PortfolioPageSkeleton = EntrySkeletonType<
  PortfolioPageFields,
  'portfolioPage'
>;
export type PortfolioPageEntrySkeleton = PortfolioPageSkeleton;