# Storybook Addon Theme Toggle

This addon is inspired by [`@storybook/addon-backgrounds`](https://github.com/storybooks/storybook/tree/next/addons/backgrounds) and [`storybook-addon-themes`](https://github.com/tonai/storybook-addon-themes) and builds a smoother and more feature rich implementation. Also see [`storybook-addon-background-toggle`](https://github.com/nickofthyme/storybook-addon-background-toggle).

This addon can be used to add a custom HTML class(es) to one or many target HTML elements. All options are explained below, see [Parameters](#parameters) section below.

Test it out at https://nickofthyme.github.io/storybook-addon-theme-toggle/

https://user-images.githubusercontent.com/19007109/128076049-7aca13a8-9e5e-4ce2-9bc0-9f82ab662418.mp4

## Compatibility

This version is compatible with storybook version `>6.x`.

As of storybook `6.3.0` global parameters are synced with the url as query search params ([storybookjs/storybook#15056](https://github.com/storybookjs/storybook/pull/15056)). As such this will lock-in the default global and be persisted between stories. If you want to avoid this behavior you can use `storybook@~6.2.0`.

## Installation

### yarn
```sh
yarn add -D storybook-addon-theme-toggle
```

### npm
```sh
npm i -D storybook-addon-theme-toggle
```

## Getting started

Once installed, add this addon to the `addons` array in storybooks `main.js` file:

```jsx
// main.js
module.exports = {
  addons: [
    'storybook-addon-theme-toggle'
  ],
};
```

See the [storybook documentation](https://storybook.js.org/docs/addons/using-addons/) for more information.

## Parameters

The parameters for this plugin are under the `theme` key and are defined below.

```tsx
interface Parameters {
  /**
   * Ignores global values in url params
   *
   * @default true
   */
  ignoreQueryParams?: false;
  /**
   * Tefault theme id
   */
  default?: string;
  /**
   * Theme options to be applied
   */
  themes: Theme[];
  /**
   * Selected theme is clearable
   *
   * @default true
   */
  clearable?: boolean;
  /**
   * Disable addon at story level
   *
   * @default false
   */
  disable?: boolean;
  /**
   * Persist theme selection between stories
   *
   * @default false
   */
  persist?: boolean;
  /**
   * Blur tooltip on theme selection
   *
   * @default true
   */
  blurOnSelect?: boolean;
  /**
   * Override icon used in toolbar
   * See https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
   *
   * @default 'mirror'
   */
  icon?: IconsProps['icon'];
  /**
   * A callback that will be executed when the theme changes
   */
  onChange?: (theme: Theme) => void;
  /**
   * Target element selector(s) to apply class(es)
   *
   * @default 'body'
   */
  selector?: string | string[];
}
```

The `Theme` type is defined below.

```tsx
interface Theme {
  /**
   * id of the theme
   */
  id: string;
  /**
   * Title of the theme in theme selector ui
   *
   * @default {@link Theme#id}
   */
  title?: string;
  /**
   * Class or classes to be applied to targeted element(s) via selector(s)
   */
  class?: string | string[]
  /**
   * Badge color in the theme selector ui
   */
  color: string;
  /**
   * Url of image to display over color swatch on theme selector
   */
  imageUrl?: string
}
```

## Configuration

### Global level

You can configure the themes at the global level in the storybook `preview.(ts|js)` file as demonstrated below.

```tsx
// preview.ts

import type { ThemeParameter } from 'storybook-addon-theme-toggle';

type Parameters = ThemeParameter & {
  // other global parameter types
};

export const parameters: Parameters = {
  theme: {
    default: 'light',
    selector: 'body',
    onChange(theme) {
      // handle new theme
    },
    themes: [
      {
        id: 'light',
        title: 'Light',
        class: 'light',
        color: '#fff',
      },
      {
        id: 'dark',
        title: 'Dark',
        class: 'dark',
        color: '#000',
      },
    ],
  }
};
```

### Story level

All properties defined in `ThemeParameter` are capable of being overridden at the story level. However, it is only advisable to override some of the parameters to prevent defining parameters that could negatively affect the addon behavior across all stories. The acceptable properties include `default`, `blurOnSelect`, `disable`, `ignoreQueryParams` and `clearable`. The `ThemeStoryParameter` type is a helper that should be used to limit what properties are overridden at the story level;

```tsx
// story1.stories.tsx

import type { ThemeStoryParameter } from 'storybook-addon-theme-toggle';

const Example = () => <span>Hello!</span>;

Example.parameters: ThemeStoryParameter = {
  theme: {
    default: 'dark',
  }
};
```

## Usage in Decorators

Global storybook [`Decorators`](https://storybook.js.org/docs/react/writing-stories/decorators#global-decorators) can be used for a multitude of things. As such it is important to have access to the selected theme inside the decorators. This is the primary reason for chosing to use `globals` to maintain the state of the selected theme.

Below is a simple example of how you could access the theme via the `context.globals`.

```tsx
// preview.tsx

import React from "react";

import type { DecoratorFunction } from "@storybook/addons";
import type { ThemeGlobals } from 'storybook-addon-theme-toggle';

const Decorator: DecoratorFunction<JSX.Element> = (Story, context) => {
  const globals = context.globals as ThemeGlobals;
  const selectedTheme = globals.theme;

  return (
    <div>
      <Story {...context} />
      <br />
      <pre>
        Theme: {selectedTheme}
        {JSON.stringify(globals, null, 2)}
      </pre>
    </div>
  );
};

export const decorators = [Decorator];
```

See a full example of this in [`.storybook/Decorator.tsx`](.storybook/Decorator.tsx).

> Globals are currently not correctly initialized by storybook, meaning they *always* return `{}` as the initial value. To correct this, we update globals with the default/initial theme id once the `SET_STORIES` event is emitted, if they differ.

## Framework Support

| [React](https://reactjs.org/) |
|:-:|
| :white_check_mark: |
