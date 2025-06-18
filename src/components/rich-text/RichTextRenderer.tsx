// components/rich-text/RichTextRenderer.tsx
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { renderOptions } from './renderOptions';

type Props = {
  document: Document;
};

export default function RichTextRenderer({ document }: Props) {
  return <>{documentToReactComponents(document, renderOptions)}</>;
}
