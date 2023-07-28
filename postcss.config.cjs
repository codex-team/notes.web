/* eslint-disable @typescript-eslint/no-var-requires */
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');
const postcssApply = require('postcss-apply');
const postcssHoverMediaFeature = require('postcss-hover-media-feature');

module.exports = function () {
  return {
    plugins: [
      postcssNested(),
      postcssPresetEnv({
        features: {
          'nesting-rules': false,
        },
      }),
      postcssApply(),
      postcssHoverMediaFeature(),
    ],
  };
};
