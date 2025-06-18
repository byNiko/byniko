import { subfont, logo_font } from './ui/fonts';
import styles from './ui/home.module.css';
import './ui/home.css';

import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ id: string, params: object }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const paramsData = await params;
  console.log('id', paramsData);
  return {
    title: params,
  };
}

export default function Home({ params, searchParams }: Props) {
  return (
    <div className="flex flex-col items-center justify-items-center">
      <main className="flex flex-col gap-[2px]  items-center">
        <div className={`${styles.masthead}`}>
          <h1
            className={`uppercase text-9xl ${logo_font.className} antialiased drop-shadow-lg drop-shadow-cyan-500`}
          >
            byNiko.
          </h1>
          <p
            className={`text-center text-2xl ${subfont.className} antialiased `}
          >
            website & brand development for the arts
          </p>
        </div>
      </main>
    </div>
  );
}
