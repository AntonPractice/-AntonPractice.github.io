import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ModalPortalButtoneus from './ModalPortalButtoneus';

export default {
  title: 'ModalPortalButtoneus',
  component: ModalPortalButtoneus,
} as Meta;

const Template: StoryFn = () => <ModalPortalButtoneus />;

export const Default = Template.bind({});
Default.args = {};
