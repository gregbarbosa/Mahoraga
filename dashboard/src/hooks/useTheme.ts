import { useEffect, useState } from "react";

export type ThemeVariant = "legacy" | "balanced" | "accessible";
export type ThemeMode = "light" | "dark";

interface ThemeState {
  variant: ThemeVariant;
  mode: ThemeMode;
}

const THEME_STORAGE_KEY = "mahoraga_theme_v2";
const LEGACY_THEME_KEY = "mahoraga_theme"; // For migration

function getSystemMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function migrateLegacyTheme(): ThemeState | null {
  if (typeof window === "undefined") return null;

  // Check for old theme format and migrate
  const legacyStored = localStorage.getItem(LEGACY_THEME_KEY);
  if (legacyStored) {
    // Remove old key after reading
    localStorage.removeItem(LEGACY_THEME_KEY);

    // Migrate old "light"/"dark" to new format with "balanced" as default
    const mode: ThemeMode = legacyStored === "light" ? "light" : "dark";
    const migrated: ThemeState = { variant: "balanced", mode };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }

  return null;
}

function getStoredTheme(): ThemeState | null {
  if (typeof window === "undefined") return null;

  // Try migration first
  const migrated = migrateLegacyTheme();
  if (migrated) return migrated;

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Validate the structure
      if (
        parsed &&
        typeof parsed === "object" &&
        ["legacy", "balanced", "accessible"].includes(parsed.variant) &&
        ["light", "dark"].includes(parsed.mode)
      ) {
        return parsed as ThemeState;
      }
    } catch {
      // Invalid JSON, ignore
    }
  }
  return null;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeState>(() => {
    const stored = getStoredTheme();
    if (stored) return stored;

    // Default to balanced theme with system mode
    return { variant: "balanced", mode: getSystemMode() };
  });

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const stored = getStoredTheme();
      // Only auto-switch if user hasn't manually set a theme
      if (stored === null) {
        setThemeState((prev) => ({ ...prev, mode: e.matches ? "dark" : "light" }));
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Apply theme classes to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove("light", "dark", "theme-legacy", "theme-balanced", "theme-accessible");

    // Add current theme classes
    root.classList.add(`theme-${theme.variant}`);
    root.classList.add(theme.mode);

    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const cycleVariant = () => {
    const variants: ThemeVariant[] = ["legacy", "balanced", "accessible"];
    const currentIndex = variants.indexOf(theme.variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setThemeState((prev) => ({ ...prev, variant: variants[nextIndex] }));
  };

  const toggleMode = () => {
    setThemeState((prev) => ({
      ...prev,
      mode: prev.mode === "light" ? "dark" : "light",
    }));
  };

  const setVariant = (variant: ThemeVariant) => {
    setThemeState((prev) => ({ ...prev, variant }));
  };

  const setMode = (mode: ThemeMode) => {
    setThemeState((prev) => ({ ...prev, mode }));
  };

  return {
    variant: theme.variant,
    mode: theme.mode,
    cycleVariant,
    toggleMode,
    setVariant,
    setMode,
  };
}
