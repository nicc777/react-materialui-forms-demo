import React from 'react';
import LoginPage from './LoginPage';

export default {
    title: 'LoginPage',
    component: LoginPage,
  };

const Template = (args) => <LoginPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    current_user: "testuser@example.tld",
};

