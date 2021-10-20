import { Meta, Story } from '@storybook/react';
import TagButton, { TagButtonProps } from '../../../components/atoms/TagButton';

export default {
  title: 'Components/Atoms/Button',
  component: TagButton,
} as Meta;

const Template: Story<TagButtonProps> = (args) => <TagButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  filter: '*',
  text: 'Default',
  active: false,
};
