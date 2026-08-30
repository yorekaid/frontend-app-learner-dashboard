import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always initialize to true as requested
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Force clip-theme-dark to true continuously to prevent sudden changes
    try {
      localStorage.setItem('clip-theme-dark', 'true');
    } catch (e) {
      // Ignore write errors
    }

    if (typeof document !== 'undefined' && document.body) {
      if (isDarkMode) {
        document.body.classList.add('dashboard-dark-mode');
      } else {
        document.body.classList.remove('dashboard-dark-mode');
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'clip-theme-dark') {
        try {
          // Force it back to true if changed from another tab, to avoid sudden changes
          localStorage.setItem('clip-theme-dark', 'true');
          setIsDarkMode(true);
        } catch (err) {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const contextValue = useMemo(() => ({ isDarkMode }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
