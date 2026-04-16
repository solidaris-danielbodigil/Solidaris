import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Solidaris Design System',
  brandUrl: 'https://solidaris.example.com',
  brandImage: 'https://solidaris.example.com/logo.png',
});

addons.setConfig({
  theme,
});