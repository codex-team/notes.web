// ThemeService.ts
import { ref } from 'vue';

const currentBaseTheme = ref((localStorage.getItem('baseTheme') ?? '') || 'Classic');
const currentAccentTheme = ref((localStorage.getItem('accentTheme') ?? '') || 'Classic');
/**
 * Changes Accent theme
 *
 * @param accentThemeName - the name of Accent theme
 */
const setAccentTheme = (accentThemeName:string):void => {
  currentAccentTheme.value = accentThemeName;
  localStorage.setItem('accentTheme', accentThemeName);


  // applyAccentTheme();
};
/**
 *  Changes base theme
 *
 * @param baseThemeName - The name of base theme
 */
const setBaseTheme = (baseThemeName:string):void => {
  currentBaseTheme.value = baseThemeName;
  localStorage.setItem('baseTheme', baseThemeName);
};

const getThemeFromLocalStorage = ():{baseTheme: string |null, accentTheme: string |null} => {
  return {
    baseTheme: localStorage.getItem('baseTheme'),
    accentTheme: localStorage.getItem('accentTheme'),
  };
};

export default {
  currentBaseTheme,
  currentAccentTheme,
  setAccentTheme,
  setBaseTheme,
  getThemeFromLocalStorage,
};
