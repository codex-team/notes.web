import { useLocalStorage, createSharedComposable } from '@vueuse/core';
import type { Ref } from 'vue';

/**
 * Available themes for the application.
 */
export enum Theme {
  Graphite = 'graphite',
  Sky = 'sky',
  Crimson = 'crimson',
  Grass = 'grass',
  Red = 'red',
  Violet = 'violet',
  Amber = 'amber',
  Pure = 'pure'
}

/**
 * Scope of usage for the theme
 */
export type ThemeScope = 'base' | 'accent';

/**
 * Available color scheme values
 */
export enum ColorScheme {
  Light = 'light',
  Dark = 'dark'
}

/**
 * Local storage key for base theme value
 */
const LOCAL_STORAGE_KEY_THEME_BASE = 'theme-base';

/**
 * Local storage key for accent theme value
 */
const LOCAL_STORAGE_KEY_THEME_ACCENT = 'theme-accent';

/**
 * Local storage key for color scheme value
 */
const LOCAL_STORAGE_KEY_COLOR_SCHEME = 'color-scheme';

/**
 * Apply theme to the body element
 * @param type – type of theme to apply
 * @param theme – theme to apply
 */
function applyTheme(type: ThemeScope, theme: Theme): void {
  const bodyEl = document.body;

  bodyEl.setAttribute(`theme-${type}`, theme);
}

/**
 * Apply color scheme to the body element
 * @param value – color scheme to apply
 */
function applyColorScheme(value: ColorScheme): void {
  const bodyEl = document.body;

  bodyEl.setAttribute('color-scheme', value);
}

/** Type for theme hook */
type UseTheme = {
  /** Current base theme value. 'graphite' by default */
  themeBase: Ref<Theme>;
  /** Current accent theme value. 'sky' by default */
  themeAccent: Ref<Theme>;
  /** Current color scheme value. 'dark' by default */
  colorScheme: Ref<ColorScheme>;
  /** Update base theme value */
  setBaseTheme: (value: Theme) => void;
  /** Update accent theme value */
  setAccentTheme: (value: Theme) => void;
  /** Set color scheme value */
  setColorScheme: (value: ColorScheme) => void;
}
/**
 * Composable to manage app themes.
 * Allows to set accent and base themes
 */
export const useTheme: () => UseTheme = createSharedComposable(
  () => {
    /**
     * Current base theme value. 'graphite' by default
     */
    const themeBase = useLocalStorage<Theme>(LOCAL_STORAGE_KEY_THEME_BASE, Theme.Graphite);

    /**
     * Current accent theme value. 'sky' by default
     */
    const themeAccent = useLocalStorage<Theme>(LOCAL_STORAGE_KEY_THEME_ACCENT, Theme.Sky);

    /**
     * Current color scheme value. 'dark' by default
     */
    const colorScheme = useLocalStorage<ColorScheme>(LOCAL_STORAGE_KEY_COLOR_SCHEME, ColorScheme.Dark);

    applyTheme('base', themeBase.value);

    applyTheme('accent', themeAccent.value);

    applyColorScheme(colorScheme.value);

    /**
     * Update base theme value
     * @param value - new theme value
     */
    function setBaseTheme(value: Theme): void {
      themeBase.value = value;

      applyTheme('base', value);
    }

    /**
     * Update accent theme value
     * @param value - new theme value
     */
    function setAccentTheme(value: Theme): void {
      themeAccent.value = value;

      applyTheme('accent', value);
    }

    /**
     * Set color scheme value
     * @param value - new color scheme value
     */
    function setColorScheme(value: ColorScheme): void {
      colorScheme.value = value;

      applyColorScheme(value);
    }

    return {
      themeBase,
      themeAccent,
      colorScheme,
      setBaseTheme,
      setAccentTheme,
      setColorScheme,
    };
  }
);
