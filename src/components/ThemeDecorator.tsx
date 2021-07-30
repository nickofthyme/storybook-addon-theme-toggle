import React, { useEffect, useMemo } from 'react'
import { DecoratorFunction, useParameter } from '@storybook/addons';

import { Parameters } from '../types';

export const ThemeDecorator: DecoratorFunction<JSX.Element> = (Story, context) => {
  const themeParams = useParameter<Parameters | null>('theme', null);
  const selectedId = context.globals.theme ? String(context.globals.theme) : undefined;

  const theme = useMemo(
    () => (themeParams?.themes ?? []).find(({ id }) => id === selectedId),
    [themeParams, selectedId]
  );

  const allClasses = useMemo(() => (themeParams?.themes ?? []).reduce<string[]>((acc, t) => {
      if (!t.class) return acc;
      return [...acc, ...(typeof t.class === 'string' ? [t.class] : t.class)];
    }, [])
  , [themeParams]);

  const classes = useMemo(() => {
    if (!theme?.class) return null;

    return typeof theme.class === 'string' ? [theme.class] : theme.class
  }, [theme])

  const targets = useMemo(() => {
    if (!themeParams) return null;
    const selector = (Array.isArray(themeParams.selector) ? themeParams.selector.join(', ') : themeParams.selector) ?? 'body';
    return selector ? document.querySelectorAll<HTMLElement>(selector) : null;
  }, [themeParams])


  useEffect(() => {
    if (targets) {
      targets.forEach((e) => {
        allClasses.forEach((c) => e.classList.remove(c));
        if (classes) classes.forEach((c) => e.classList.add(c));
      });
    }
  }, [targets, allClasses, classes]);

  return <Story {...context} />
}
