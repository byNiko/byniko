'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import navLinksData from '@/utils/navLinks-data';

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    // The sheet covers the page, so everything behind it must leave the tab
    // order and the accessibility tree — otherwise Tab walks into content the
    // visitor cannot see (WCAG 2.4.3).
    const siblings = Array.from(document.body.children).filter(
      (el) => !el.contains(sheetRef.current) && !el.contains(headerRef.current),
    ) as HTMLElement[];
    siblings.forEach((el) => {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    });

    sheetRef.current?.querySelector<HTMLElement>('a')?.focus();

    // With every other body child inert, the browser's own tab order already
    // stays inside the header and the sheet — the wordmark, the toggle and the
    // links, all of which are visible while the menu is open. Both are spared
    // because they are now siblings rather than nested. No manual Tab
    // interception, so no chance of fighting the browser over focus.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      siblings.forEach((el) => {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      });
    };
  }, [open, close]);

  const links = navLinksData.filter((l) => l.href !== '/');

  return (
    <>
      <header
        ref={headerRef}
        className="rule-bottom sticky top-0 z-50 bg-paper/92 backdrop-blur-sm"
      >
        <div className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
          <div className="flex items-baseline gap-4">
            <Link href="/" className="wordmark no-underline">
              byNiko
            </Link>
            <span className="t-label hidden text-ink-faint sm:inline">
              Independent · since 2010
            </span>
          </div>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {links.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'group text-sm no-underline transition-colors',
                        active
                          ? 'font-semibold text-ink'
                          : 'font-medium text-ink-muted hover:text-ink',
                      )}
                    >
                      {link.name}
                      <span
                        aria-hidden
                        className={clsx(
                          'mt-1 block h-px origin-left bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => (open ? close() : setOpen(true))}
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={clsx(
                  'absolute left-0 block h-[1.5px] w-6 bg-ink transition-transform duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={clsx(
                  'absolute left-0 top-1.5 block h-[1.5px] w-6 bg-ink transition-opacity duration-200',
                  open ? 'opacity-0' : 'opacity-100',
                )}
              />
              <span
                className={clsx(
                  'absolute left-0 block h-[1.5px] w-6 bg-ink transition-transform duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Outside the header on purpose. The header carries `backdrop-blur`, and
          a `backdrop-filter` ancestor becomes the containing block for its
          `position: fixed` descendants — so `inset: 0` resolved against the
          64px header instead of the viewport and the sheet rendered 390x128,
          its paper covering only the top of the page while the links floated
          over live content. */}
      <div
        ref={sheetRef}
        id="mobile-nav"
        className="mobile-sheet md:hidden"
        data-open={open}
        aria-hidden={!open}
      >
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.name}
              href={link.href}
              tabIndex={open ? 0 : -1}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'rule-bottom py-4',
                active ? 'text-accent' : 'text-ink',
              )}
            >
              {link.name}
            </Link>
          );
        })}
        <Link
          href="/contact"
          tabIndex={open ? 0 : -1}
          className="action mt-8 w-full no-underline"
        >
          Start a project <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
