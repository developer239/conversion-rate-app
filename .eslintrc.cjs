module.exports = {
  extends: [
    '@linters/eslint-config-typescript',
    'prettier',
  ],
  rules: {
    'import/no-default-export': 0,
    'no-console': 0,
    'max-lines-per-function': 0,
    'complexity': 0,
    '@typescript-eslint/no-use-before-define': 0
  },
  ignorePatterns: [
    'astro.config.mjs'
  ]
}
