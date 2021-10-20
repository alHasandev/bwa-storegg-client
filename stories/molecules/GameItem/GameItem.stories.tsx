import { Meta, Story } from '@storybook/react';
import GameItem, { GameItemProps } from '../../../components/molecules/GameItem';

export default {
  title: 'Components/Molecules/GameItem',
  component: GameItem,
} as Meta;

const Template: Story<GameItemProps> = (args) => <GameItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  imgSrc: '/img/Thumbnail-1.png',
  title: 'Super Mechs',
  category: 'Mobile',
};
