const typescriptParser = require('@typescript-eslint/parser')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')

module.exports = [
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