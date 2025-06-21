'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop({
  targetElement,
}: {
  targetElement: string;
}) {
	const pathname = usePathname();
	useEffect( () => {
	if ( typeof document !== 'undefined' ) {
		const target = targetElement
			? document.querySelector( targetElement )
			: undefined;
		
			if ( target ) {
				target.scrollTo( 0, 0 );
			}
		}
	}, [pathname] );
  return null;
}
