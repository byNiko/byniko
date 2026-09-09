import { Archivo } from 'next/font/google';

/**
 * One superfamily. Hierarchy comes from the width axis, not from a second face:
 * expanded for the statement, regular for prose, narrow tracked caps for labels.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});
