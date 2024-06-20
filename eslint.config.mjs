import CodeX from 'eslint-config-codex';
import { plugin as TsPlugin, parser as TsParser } from 'typescript-eslint';
import VueParser from 'vue-eslint-parser';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * @todo connect architecture config
 */
export default [
  ...CodeX,
  ...compat.extends('.architecture.eslintrc'),
  {
    name: 'ts-notex.web',
    ignores: ['codex-ui/**/*', '*.pcss', '*.otf', 'eslint.config.mjs'],
    plugins: {
      '@typescript-eslint': TsPlugin,
    },

    /**
     * This are the options for typescript files
     */
    languageOptions: {
      parser: TsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: './',
        sourceType: 'module', // Allows for the use of imports
      },
    },

    rules: {
      'n/no-missing-import': ['off'],
      'n/no-unpublished-import': ['error', {
        allowModules: ['vitest', 'postgres-migrations', 'eslint-config-codex'],
        ignoreTypeImport: true,
      }],
      'n/no-unsupported-features/node-builtins': ['error', {
        version: '>=22.1.0',
      }],
      'n/no-extraneous-import': ['error', {
        allowModules: ['@editorjs/editorjs'],
      }],
      '@typescript-eslint/naming-convention': ['error', {
        selector: 'property',
        format: ['camelCase'],
        filter: {
          regex: '^(?!(2xx|2[0-9][0-9]|application/json|VITE.*|HAWK.*)$).*',
          match: true,
        },
      }],

      /**
       * @todo get rid of this rule ignores and solve all eslint errors occured
       */
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/no-unsafe-argument': ['off'],
      '@typescript-eslint/no-unsafe-return': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      'jsdoc/require-param-type': ['off'],
      'jsdoc/informative-docs': ['off'],
      'jsdoc/require-jsdoc': ['off'],
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
      'jsdoc/require-param-type': ['off'],
      'jsdoc/informative-docs': ['off'],
      'jsdoc/require-jsdoc': ['off'],
    },
  },
];
