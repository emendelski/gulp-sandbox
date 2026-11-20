import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['assets/']),
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {globals: globals.browser},
  },
  {
    files: ['*.js'],
    languageOptions: {globals: globals.node},
  },
  prettier,
]);
