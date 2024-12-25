import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'semi': ['error', 'never'],
            '@typescript-eslint/no-unused-vars': ['error'],
        },
    },
]