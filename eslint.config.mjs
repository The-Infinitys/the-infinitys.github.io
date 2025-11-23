import next from 'eslint-config-next';

const eslintConfig = [
  ...next,
  {
    ignores: ['archive/**'],
  },
];

export default eslintConfig;

