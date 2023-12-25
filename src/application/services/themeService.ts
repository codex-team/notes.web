// themeService.ts
import { reactive } from 'vue';

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  whiteColor: string;
}

type ThemeName = 'default' | 'choco' | 'graphite' | 'blue';
/**
 * Gets the initial theme name from local storage or sets it to 'default'
 */
const initialThemeName: ThemeName = (localStorage.getItem('theme') as ThemeName) || 'default';

const themes: Record<ThemeName, ThemeState> = {
  default: {
    primaryColor: '#0C0D0D',
    secondaryColor: '#424448',
    backgroundColor: '#1D1E20',
    textColor: '#FFFFFF',
    linkColor: '#F2F2F3',
    whiteColor: '#FFFFFF',
  },
  choco: {
    primaryColor: '#0D0C0D',
    secondaryColor: '#484246',
    backgroundColor: '#201D1F',
    textColor: '#FFFFFF',
    linkColor: '#898086',
    whiteColor: '#FFFFFF',
  },
  graphite: {
    primaryColor: '#0B0C0E',
    secondaryColor: '#3E434C',
    backgroundColor: '#222429',
    textColor: '#FFFFFF',
    linkColor: '#ABB0BA',
    whiteColor: '#F1F2F4',
  },
  blue: {
    primaryColor: '#040A16',
    secondaryColor: '#153575',
    backgroundColor: '#0F2757',
    textColor: '#FFFFFF',
    linkColor: '#A8C0F0',
    whiteColor: '#E9EFFB',
  },
};

/**
 * Represents the state of the theme.
 */
const themeState: ThemeState = reactive(themes[initialThemeName]);


/**
 * Sets the theme
 *
 * @param themeName - The name of the theme to set
 */
function setTheme(themeName: ThemeName): void {
  console.log(`Setting theme '${themeName}'`);
  const selectedTheme = themes[themeName];

  if (typeof selectedTheme !== 'undefined') {
    console.log(`Applying '${themeName}'`);

    // Iterate over the keys of the selected theme and applies them to the themeState object
    Object.keys(selectedTheme).forEach((key) => {
      themeState[key as keyof ThemeState] = selectedTheme[key as keyof ThemeState];
    });

    // Save the theme to local storage
    localStorage.setItem('theme', themeName);
  } else {
    console.error(`Theme '${themeName}' not found. Applying default theme.`);
    Object.keys(themes.default).forEach((key) => {
      themeState[key as keyof ThemeState] = themes.default[key as keyof ThemeState];
    });
  }

  const themeChangeEvent = new CustomEvent('theme-change', {
    detail: { theme: themeState },
  });

  document.dispatchEvent(themeChangeEvent);
}

export { themeState, setTheme };
