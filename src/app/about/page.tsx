'use client';
import { body_font } from '../ui/fonts';

export default function About() {

  return (

      <div className="container mx-auto max-w-2xl xl:max-w-4xl ">
        <div className={`flex flex-col ${body_font.className} text-xl`}>
          <h2 className={`font-extrabold text-4xl mb-4`}>We speak artist.</h2>
          <div className="prose prose-2xl prose-blue">
            <p>
              {`Since 2010, ByNiko has been the bridge between creative vision and
            digital reality. As an artist-led studio, we don't just build
            websites and brands—we amplify voices.`}
            </p>
            <p>
              {`Here's the thing: most developers don't get it. They see pixels
            where you see possibility. They hear "user experience" where you
            hear your life's work. We're different. We're artists who code,
            creators who understand that your website isn't just a business
            card—it's your gallery, your stage, your revolution.`}
            </p>
            <p>
              {`We craft bold branding and cutting-edge web development that honors
            your artistic integrity while meeting every web standard and best
            practice. No compromises. No cookie-cutter solutions. Just authentic
            digital experiences that hit as hard as your art.`}
            </p>
            <p>{`Your voice. Our expertise. Pure creative fire.`}</p>
            <p>
              {`Ready to turn your vision into a digital masterpiece that actually
            works? Let's make some magic.`}
            </p>
          </div>
        </div>
      </div>
  );
}
