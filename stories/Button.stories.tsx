import React from "react";
import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
  parameters: {},
};

const Example = () => {
  const setTheme = (themeId?: string) => () => {
    console.log(themeId);

    const urlString = window.parent.location.toString();
    const url = new URL(urlString);
    url.searchParams.delete('globals');

    if (themeId) {
      url.searchParams.append('globals', `theme:${themeId}`);
    }

    const newUrl = url.toString();

    if (newUrl !== urlString) {
      window.parent.location.replace(newUrl);
    }
  }

  return (
    <div>
      <Button onClick={setTheme('light')}>Set url theme param to light</Button>
      <Button onClick={setTheme('dark')}>Set url theme param to dark</Button>
      <Button onClick={setTheme()}>Clear url theme param</Button>
    </div>
  );
};

export const Example1 = Example.bind({});
Example1.storyName = 'Global defaults'

export const Example2 = Example.bind({});
Example2.storyName = 'Story level overrides'
Example2.parameters = {
  theme: {
    default: 'dark',
  }
};

