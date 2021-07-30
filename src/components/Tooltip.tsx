import React, { ComponentProps, FC } from 'react'
import { TooltipLinkList, Icons } from '@storybook/components';

import { Parameters, Theme } from '../types';
import { Color } from './Color';

type Link = ComponentProps<typeof TooltipLinkList>['links'][number];

interface Props {
  selected?: Theme;
  setTheme: (themeId?: string, toggleTooltip?: boolean) => void;
  themeParams: Parameters;
}

export const Tooltip: FC<Props> = ({ selected, setTheme, themeParams }) => {
  const links: Link[] = themeParams.themes.map(({ id, title, color, imageUrl }) => ({
    id,
    key: id,
    loading: false,
    title: title ?? id,
    active: selected && id === selected.id,
    onClick: () => setTheme(id),
    right: <Color background={color} imageUrl={imageUrl} />
  }));

  if (selected && (themeParams.clearable ?? true)) {
    links.unshift(getClearLink(setTheme));
  }

  return <TooltipLinkList links={links} />
}

const getClearLink = (setTheme: (themeId?: string, toggleTooltip?: boolean) => void): Link => {
  const id = '__clearable__link___';
  return {
    id,
    key: id,
    loading: false,
    title: 'Clear selected theme',
    active: false,
    onClick: () => setTheme(),
    right: <Icons icon="cross" />
  }
};
