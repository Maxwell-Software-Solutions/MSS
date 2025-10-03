import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['**/.next/**', '**/node_modules/**'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'TSTypeReference[typeName.name="Record"][typeParameters.params.length=2] > TSTypeParameterInstantiation > TSTypeReference[typeName.name="string"]',
          message: 'Prefer more specific key types than string for Records when possible.',
        },
      ],
    },
  },
];

export default eslintConfig;
