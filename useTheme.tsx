
import { useState, useEffect, createContext, useContext } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme from localStorage if available, or from system preference
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('vision-force-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Apply theme class to html element whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    const previousTheme = theme === 'dark' ? 'light' : 'dark';

    root.classList.remove(previousTheme);
    root.classList.add(theme);
    localStorage.setItem('vision-force-theme', theme);
  }, [theme]);

  // Derived boolean for convenience
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
