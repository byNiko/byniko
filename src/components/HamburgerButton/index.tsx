'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Props = {
  onToggle?: (open: boolean) => void;
  className?: string;
};

export default function HamburgerButton({ onToggle, className }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  };

  const commonStyles = 'absolute w-6 h-0.5 bg-black rounded origin-center';

  return (
    <button
      aria-label="Toggle menu"
      onClick={toggle}
      className={clsx(
        'relative w-10 h-10 flex items-center justify-center',
        className,
      )}
    >
      {/* Top bar */}
      <motion.span
        className={commonStyles}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
        transition={{ duration: 0.3 }}
      />
      {/* Middle bar */}
      <motion.span
        className={commonStyles}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Bottom bar */}
      <motion.span
        className={commonStyles}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}
