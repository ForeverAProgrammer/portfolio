import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    ignores: ['build/**', '.docusaurus/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'docusaurus.config.js', 'sidebars.js'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      // React 17+ new JSX transform — no need to import React for JSX
      'react/react-in-jsx-scope': 'off',
      // No PropTypes — small personal project, no TypeScript
      'react/prop-types': 'off',
    },
  },
];
