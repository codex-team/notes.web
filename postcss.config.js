import { fileURLToPath } from 'url';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssApply from 'postcss-apply';
import postcssHoverMediaFeature from 'postcss-hover-media-feature';

/**
 * Returns PostCSS config
 *
 * @returns {object} PostCSS config
 */
export default function () {
  return {
    plugins: [
      postcssGlobalData({ files: [fileURLToPath(new URL('./@codexteam/ui/src/styles/breakpoints.pcss', import.meta.url))] }),
      postcssNested(),
      postcssPresetEnv(),
      postcssApply(),
      postcssHoverMediaFeature(),
    ],
  };
}
