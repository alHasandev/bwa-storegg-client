import { Meta, Story } from '@storybook/react';
import StepItem, { StepItemProps } from '../../../components/molecules/StepItem';

export default {
  title: 'Components/Molecules/StepItem',
  component: StepItem,
} as Meta;

const Template: Story<StepItemProps> = (args) => <StepItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconSrc: '/icon/transaction-start.svg',
  title: '1. Start',
  description: ['Pilih salah satu game', 'yang ingin kamu top up'],
};
