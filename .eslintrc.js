module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: ['vue', 'prettier', 'import'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/script-indent': 2,
    'vue/html-indent': 2,
    'vue/first-attribute-linebreak': ['error', {
      'singleline': 'ignore',
      'multiline': 'below',
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 1,
      },
      'multiline': {
        'max': 1,
      },
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always',
    }],
    'prefer-promise-reject-errors': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-extra-boolean-cast': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    'array-bracket-spacing': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'import/newline-after-import': ['error', { count: 1 }],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.vue', '.json'],
      },
    },
  },
}
