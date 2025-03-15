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
    plugins: [postcssNested(), postcssPresetEnv(), postcssApply(), postcssHoverMediaFeature()],
  };
}
