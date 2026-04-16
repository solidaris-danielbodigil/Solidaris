import { join } from 'path';
import { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mjs|cjs)',
    '../libs/ui/src/**/*.stories.@(js|jsx|ts|tsx|mjs|cjs)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/angular',
  staticDirs: ['../apps/ishare/src/assets', '../apps/icrm/src/assets'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': join(__dirname, '../../libs/styles/src'),
      '@plectrum': join(__dirname, '../../libs/plectrum/src'),
    };
    return config;
  },
};

export default config;