import { useLocalStorage, createSharedComposable } from '@vueuse/core';
import type { Ref } from 'vue';

/**
 * Available themes for the application.
 */
export enum Theme {
  Classic = 'classic',
  Crimson = 'crimson',
  Grass = 'grass',
  Red = 'red',
  Violet = 'violet',
}

/**
 * Available color mode values
 */
export enum ColorMode {
  Light = 'light',
  Dark = 'dark',
}

/**
 * Local storage key for base theme value
 */
const LOCAL_STORAGE_KEY_THEME_BASE = 'theme_base';

/**
 * Local storage key for accent theme value
 */
const LOCAL_STORAGE_KEY_THEME_ACCENT = 'theme_accent';

/**
 * Local storage key for color mode value
 */
const LOCAL_STORAGE_KEY_COLOR_MODE = 'color_mode';

/**
 * Apply theme to the body element
 *
 * @param theme – theme to apply
 * @param type – type of theme to apply
 */
function applyTheme(theme: Theme, type: 'base' | 'accent'): void {
  const bodyEl = document.body;

  bodyEl.setAttribute(`theme-${type}`, theme);
}

/**
 * Apply color mode to the body element
 *
 * @param colorMode – color mode to apply
 */
function applyColorMode(colorMode: ColorMode): void {
  const bodyEl = document.body;

  bodyEl.setAttribute('color-scheme', colorMode);
}

/**
 * Composable to manage app themes.
 * Allows to set accent and base themes
 */
export const useTheme = createSharedComposable(
  (): {
    /** Current base theme value. 'classic' by default */
    themeBase: Ref<Theme>;
    /** Current accent theme value. 'classic' by default */
    themeAccent: Ref<Theme>;
    /** Current color mode value. 'dark' by default */
    colorMode: Ref<ColorMode>;
    /** Update base theme value */
    setBaseTheme: (value: Theme) => void;
    /** Update accent theme value */
    setAccentTheme: (value: Theme) => void;
    /** Set color mode value */
    setColorMode: (value: ColorMode) => void;
  } => {
    /**
     * Current base theme value. 'classic' by default
     */
    const themeBase = useLocalStorage<Theme>(LOCAL_STORAGE_KEY_THEME_BASE, Theme.Classic);

    /**
     * Current accent theme value. 'classic' by default
     */
    const themeAccent = useLocalStorage<Theme>(LOCAL_STORAGE_KEY_THEME_ACCENT, Theme.Classic);

    /**
     * Current color mode value. 'dark' by default
     */
    const colorMode = useLocalStorage<ColorMode>(LOCAL_STORAGE_KEY_COLOR_MODE, ColorMode.Dark);

    applyTheme(themeBase.value, 'base');

    applyTheme(themeAccent.value, 'accent');

    applyColorMode(colorMode.value);

    /**
     * Update base theme value
     *
     * @param value - new theme value
     */
    function setBaseTheme(value: Theme): void {
      themeBase.value = value;

      applyTheme(value, 'base');
    }

    /**
     * Update accent theme value
     *
     * @param value - new theme value
     */
    function setAccentTheme(value: Theme): void {
      themeAccent.value = value;

      applyTheme(value, 'accent');
    }

    /**
     * Set color mode value
     *
     * @param value - new color mode value
     */
    function setColorMode(value: ColorMode): void {
      colorMode.value = value;

      applyColorMode(value);
    }

    return {
      themeBase,
      themeAccent,
      colorMode,
      setBaseTheme,
      setAccentTheme,
      setColorMode,
    };
  }
);
