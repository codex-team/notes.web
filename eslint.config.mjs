import CodeX from 'eslint-config-codex';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
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
    name: 'notex.api',
    files: ['src/**/*'],
    rules: {
      'n/no-missing-import': ['off'],
      'n/no-unpublished-import': ['error', {
        allowModules: ['vitest', 'postgres-migrations', 'eslint-import-resolver-alias', 'eslint-config-codex'],
        ignoreTypeImport: true,
      }],
    },

    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json', // Автоматически находить tsconfig.json в рабочей директории
        tsconfigRootDir: './',
        sourceType: 'module', // Allows for the use of imports
      },
    },
  },
];
