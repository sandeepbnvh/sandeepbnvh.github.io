import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', theme);
    }
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const toggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '0',
        transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
        color: 'var(--text-primary)',
        boxShadow: 'var(--shadow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
    >
      {theme === 'light' ? (
        <Moon size={20} style={{ transition: 'all 0.3s ease' }} />
      ) : (
        <Sun size={20} style={{ transition: 'all 0.3s ease' }} />
      )}
    </button>
  );
}
