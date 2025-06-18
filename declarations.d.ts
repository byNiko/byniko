// declaration.ts
import { Entry } from 'contentful';

export type PortfolioPageFields = {
  title: string;
  body: object;
  slug: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
};

export type PortfolioPageEntry = Entry<PortfolioPageFields>;
