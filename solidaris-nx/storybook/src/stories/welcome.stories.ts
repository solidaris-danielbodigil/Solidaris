import { Meta, Story } from '@storybook/angular';
import { WelcomeComponent } from './welcome.component';

export default {
  title: 'Welcome',
  component: WelcomeComponent,
} as Meta;

const Template: Story = (args: WelcomeComponent) => ({
  component: WelcomeComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to Solidaris NX',
  description: 'This is a prototype application built with Angular, PrimeNG, ITCSS, BEMIT, and the Plectrum design system.',
};