import { subfont, logo_font } from './ui/fonts';
import styles from './ui/home.module.css';
import './ui/home.css';

export default function Home() {
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
