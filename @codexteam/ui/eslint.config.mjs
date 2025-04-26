import CodeX from 'eslint-config-codex';
import { plugin as TsPlugin, parser as TsParser } from 'typescript-eslint';
import VueParser from 'vue-eslint-parser';

/**
 * @todo connect architecture config
 */
export default [
  ...CodeX,
  {
    name: 'ts-codex-ui',
    ignores: ['*.pcss', '*.otf', 'eslint.config.mjs', 'postcss.config.js'],
    plugins: {
      '@typescript-eslint': TsPlugin,
    },

    /**
     * This are the options for typescript files
     */
    languageOptions: {
      parser: TsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        sourceType: 'module', // Allows for the use of imports
      },
    },

    rules: {
      'n/no-missing-import': ['off'],
      'n/no-unpublished-import': ['error', {
        allowModules: ['vitest', 'postgres-migrations', 'eslint-import-resolver-alias', 'eslint-config-codex'],
        ignoreTypeImport: true,
      }],
      'n/no-unsupported-features/node-builtins': ['error', {
        version: '>=22.1.0',
      }],
      'n/no-extraneous-import': ['error', {
        allowModules: ['@editorjs/editorjs'],
      }],
    },
  },

  /**
   * This override of the options for vue files
   */
  {
    languageOptions: {
      parser: VueParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: TsParser,
        sourceType: 'module',
      },
    },
    rules: {
      'n/no-missing-import': ['off'],
      'n/no-unpublished-import': ['error', {
        allowModules: ['vitest', 'postgres-migrations', 'eslint-import-resolver-alias', 'eslint-config-codex'],
        ignoreTypeImport: true,
      }],
      'n/no-unsupported-features/node-builtins': ['error', {
        version: '>=22.1.0',
      }],

      /**
       * @todo get rid of this rule ignores and solve all eslint errors occured
       */
      'jsdoc/require-param-type': ['off'],
      'jsdoc/informative-docs': ['off'],
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-returns': ['off'],
    },
  },
];
