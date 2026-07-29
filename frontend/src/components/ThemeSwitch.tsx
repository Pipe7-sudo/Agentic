'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full" />; // Placeholder to prevent layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.07] text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-all"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="animate-in spin-in-90" />
      ) : (
        <Moon size={18} className="animate-in spin-in-90" />
      )}
    </button>
  );
}
