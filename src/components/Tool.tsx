import React, { useEffect, useCallback, useState, useRef, FC } from "react";
import { API, useGlobals, useParameter } from "@storybook/api";
import { Icons, IconButton, WithTooltip } from '@storybook/components';

import { TOOL_ID } from "../constants";
import { Parameters } from '../types';
import { Tooltip } from "./Tooltip";
import { CURRENT_STORY_WAS_SET, SET_STORIES } from "@storybook/core-events";

interface Props {
  api: API;
}

const iconBtnId = "sotrybook-addon-theme-toggle-icon-btn";

export const Tool: FC<Props> = ({ api }) => {
  const [expanded, setExpanded] = useState(false);
  const [globals, updateGlobals] = useGlobals();
  const selectedId = globals.theme ? String(globals.theme) : undefined;
  const themeParams = useParameter<Parameters | null>('theme', null);

  const themeParamsRef = useRef(themeParams);
  useEffect(() => {
    themeParamsRef.current = themeParams;
  }, [themeParams])

  const getTheme = useCallback(
    (themeId?: string) => (themeParams?.themes ?? []).find(({ id }) => id === (themeId ?? selectedId)),
    [themeParams, selectedId]
  );

  const setTheme = useCallback(
    (themeId?: string, forcedUpdate = false) => {
      if (themeId !== selectedId) {
        const newTheme = getTheme(themeId ?? '');
        themeParams?.onChange?.(newTheme);
        updateGlobals({ theme: themeId })
      }

      // This is needed because storybook `WithTooltip` component does not
      // honor the `tooltipShown` prop to control its visibility
      if (!forcedUpdate && (themeParams?.blurOnSelect ?? true)) {
        const iconBtn = document.querySelector<HTMLButtonElement>(`#${iconBtnId}`);
        iconBtn?.click?.();
      }
    },
    [updateGlobals, selectedId, getTheme]
  );

  useEffect(() => {
    const setDefaultTheme = () => {
      const value = themeParamsRef.current?.persist ? selectedId : themeParamsRef.current?.default
      setTheme(value, true);
    };
    api.on(CURRENT_STORY_WAS_SET, setDefaultTheme);
    return () => api.off(CURRENT_STORY_WAS_SET, setDefaultTheme);
  }, [themeParamsRef, selectedId]);

  useEffect(() => {
    const setInitialTheme = () => {
      if (themeParamsRef.current && !selectedId) {
        const themeId = getThemeFromUrl(themeParamsRef.current) ?? themeParamsRef.current?.default;
        updateGlobals({ theme: themeId })
      }
    };
    api.on(SET_STORIES, setInitialTheme);
    return () => api.off(SET_STORIES, setInitialTheme);
  }, [])

  if (!themeParams || themeParams.disable || themeParams.themes?.length === 0) return null;

  const theme = getTheme();

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltipShown={expanded}
      onVisibilityChange={setExpanded}
      tooltip={
        <Tooltip
          selected={theme}
          themeParams={themeParams}
          setTheme={setTheme}
        />
      }
    >
      <IconButton
        id={iconBtnId}
        key={TOOL_ID}
        active={Boolean(theme)}
        title="Select theme"
        onClick={() => setExpanded(true)}
      >
        <Icons icon={themeParams.icon ?? 'contrast'} />
      </IconButton>
    </WithTooltip>
  );
};

/**
 * Strip and validate theme id from globals query param
 * This is needed as the initial globals are ALWAYS empty
 */
function getThemeFromUrl({ themes, ignoreQueryParams }: Parameters) {
  if (ignoreQueryParams ?? true) return null;

  const re = /theme:([^;]*)/;
  const globals = new URL(window.location.toString()).searchParams.get('globals') ?? '';
  const [, themeId] = re.exec(globals) ?? [];
  return themes.find(({ id }) => id === themeId) ? themeId : (re.test(globals) ? '' :  null);
}
