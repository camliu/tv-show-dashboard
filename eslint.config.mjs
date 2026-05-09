// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/object-curly-newline': [
      'error', {
        multiline: true,
        minProperties: 4,
        consistent: true,
      },
    ],
    '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    '@stylistic/max-len': [
      'error', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
});
