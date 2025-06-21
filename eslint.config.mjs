import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'eslint-plugin-prettier';
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all
});

export default defineConfig([
  globalIgnores(['projects/**/*']),
  {
    extends: compat.extends('plugin:prettier/recommended'),
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.ts'],
    ignores: ['cypress.config.ts'],
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:prettier/recommended'
    ),
    languageOptions: {
      parserOptions: {
        project: [
          'tsconfig.json',
          'tsconfig.app.json',
          'tsconfig.spec.json',
          'cypress/tsconfig.json'
        ],
        createDefaultProgram: true
      }
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^[iI][A-Z]',
            match: false
          }
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase']
        },
        {
          selector: 'enum',
          format: ['PascalCase']
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE']
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: compat.extends(
      'plugin:@angular-eslint/template/recommended',
      'plugin:@angular-eslint/template/accessibility',
      'plugin:prettier/recommended'
    ),
    rules: {
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error'
    }
  }
]);
