// import { subfont, logo_font } from '../../ui/fonts';
import Masthead from './Masthead';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center">
      <main className="flex flex-col gap-[2px]  items-center">
       <Masthead />
      </main>
    </div>
  );
}
