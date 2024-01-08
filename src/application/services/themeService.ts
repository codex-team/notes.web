// ThemeService.ts
import { ref, onMounted, computed } from 'vue';

interface Theme {
  [key: string]: string;
}

interface Themes {
  [key: string]: Theme;
}

const baseThemes: Themes = {
  'Classic': {
    'bgPrimary': '#000000',
    'bgSecondary': '#000000',
    'bgSecondaryHover': '#191919',
    'bgInput': '#161616',
    'border': '#1C1C1C',
    'solidHover': '#F8FD1A',
    'solid': '#3E3E3E',
    'textSecondary': '#828282',
    'text': '#FFFFFF',
    'textSolidForeground': '#FFFFFF',
  },
  'Crimson': {
    'bgPrimary': '#1D1A1B',
    'bgSecondary': '#272324',
    'bgSecondaryHover': '#322A2D',
    'bgInput': '#383134',
    'border': '#51383E',
    'solidHover': '#600F27',
    'solid': '#DD2058',
    'textSecondary': '#A4858D',
    'text': '#FADBE4',
    'textSolidForeground': '#F9F9F9',
  },
  'Violet': {
    'bgPrimary': '#19141E',
    'bgSecondary': '#261F2D',
    'bgSecondaryHover': '#261F2D',
    'bgInput': '#302B36',
    'border': '#362B40',
    'solidHover': '#261636',
    'solid': '#913BE6',
    'textSecondary': '#A389BD',
    'text': '#D9CEE5',
    'textSolidForeground': '#F2F1F4',
  },
  'Red': {
    'bgPrimary': '#171313',
    'bgSecondary': '#221B1B',
    'bgSecondaryHover': '#302626',
    'bgInput': '#312626',
    'border': '#3D2121',
    'solidHover': '#751F22',
    'solid': '#B72A2E',
    'textSecondary': '#856766',
    'text': '#F0DCDF',
    'textSolidForeground': '#FFEBEB',
  },
};

const accentThemes: Themes = {
  'Classic': {
    'bgPrimary': '#242527',
    'bgSecondary': '#2C2D30',
    'bgSecondaryHover': '#3B3C40',
    'bgInput': '#383A3E',
    'border': '#383A3E',
    'solidSecondary': '#27303B',
    'solidHover': '#183B65',
    'solid': '#1C84FF',
    'textSecondary': '#94979A',
    'text': '#F5F5F5',
    'textSolidForeground': '#F5F5F5',
  },
  'Crimson': {
    'bgPrimary': '#1D1A1B',
    'bgSecondary': '#272324',
    'bgSecondaryHover': '#322A2D',
    'bgInput': '#383134',
    'border': '#51383E',
    'solidSecondary': '#311C22',
    'solidHover': '#600F27',
    'solid': '#DD2058',
    'textSecondary': '#A4858D',
    'text': '#FADBE4',
    'textSolidForeground': '#FADBE4',
  },
  'Violet': {
    'bgPrimary': '#19141E',
    'bgSecondary': '#261F2D',
    'bgSecondaryHover': '#302B36',
    'bgInput': '#403847',
    'border': '#362B40',
    'solidSecondary': '#261636',
    'solidHover': '#461577',
    'solid': '#913BE6',
    'textSecondary': '#A389BD',
    'text': '#D9CEE5',
    'textSolidForeground': '#F2F1F4',
  },
  'Red': {
    'bgPrimary': '#171313',
    'bgSecondary': '#221B1B',
    'bgSecondaryHover': '#403838',
    'bgInput': '#312626',
    'border': '#3D2121',
    'solidSecondary': '#271616',
    'solidHover': '#271616',
    'solid': '#B72A2E',
    'textSecondary': '#856766',
    'text': '#F0DCDF',
    'textSolidForeground': '#FFEBEB',
  },
};


const currentBaseTheme = ref((localStorage.getItem('baseTheme') ?? '') || 'Classic');
const currentAccentTheme = ref((localStorage.getItem('accentTheme') ?? '') || 'Classic');

// Reactive computed properties for theme classes
const baseThemeClass = computed(() => `base-theme-${currentBaseTheme.value}`);
const accentThemeClass = computed(() => `accent-theme-${currentAccentTheme.value}`);

const applyBaseTheme = ():void => {
  const baseThemeColors = baseThemes[currentBaseTheme.value];

  for (const color in baseThemeColors) {
    document.documentElement.style.setProperty(`--base-${color}`, baseThemeColors[color]);
  }
};

/**
 * Applies Accent theme
 */
const applyAccentTheme = ():void => {
  const accentThemeColors = accentThemes[currentAccentTheme.value];

  for (const color in accentThemeColors) {
    document.documentElement.style.setProperty(`--accent-${color}`, accentThemeColors[color]);
  }
};

/**
 * Changes Accent theme
 *
 * @param accentThemeName - the name of Accent theme
 */
const setAccentTheme = (accentThemeName:string):void => {
  currentAccentTheme.value = accentThemeName;
  localStorage.setItem('accentTheme', accentThemeName);
  applyAccentTheme();
};
/**
 *  Changes base theme
 *
 * @param baseThemeName - The name of base theme
 */
const setBaseTheme = (baseThemeName:string):void => {
  currentBaseTheme.value = baseThemeName;
  localStorage.setItem('baseTheme', baseThemeName);
  applyBaseTheme();
};

// const setTheme = (baseThemeName: string, accentThemeName: string):void => {
//   currentBaseTheme.value = baseThemeName;
//   currentAccentTheme.value = accentThemeName;
//   localStorage.setItem('baseTheme', baseThemeName);
//   localStorage.setItem('accentTheme', accentThemeName);
//   applyTheme();
// };

const getThemeFromLocalStorage = ():{baseTheme: string |null, accentTheme: string |null} => {
  return {
    baseTheme: localStorage.getItem('baseTheme'),
    accentTheme: localStorage.getItem('accentTheme'),
  };
};

onMounted(() => {
  applyAccentTheme();
  applyBaseTheme();
});

export default {
  currentBaseTheme,
  currentAccentTheme,
  setAccentTheme,
  setBaseTheme,
  getThemeFromLocalStorage,
  applyAccentTheme,
  applyBaseTheme,
  baseThemeClass,
  accentThemeClass,
};
