import { IconsProps } from "@storybook/components";

export interface Theme {
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

export interface Parameters {
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
   * @default 'contrast'
   */
  icon?: IconsProps['icon'];
  /**
   * A callback that will be executed when the theme changes
   */
  onChange?: (theme?: Theme) => void;
  /**
   * Target element selector(s) to apply class(es)
   * Can pass and empty string to disable dom changes (i.e. `''`)
   *
   * @default 'body'
   */
  selector?: string | string[];
}

/**
 * Parameters to be applied **gloabally** to configure theme for theme addon
 */
export interface ThemeParameter {
  theme?: Parameters;
}

/**
 * Parameters to be applied at a **story level** to configure theme for theme addon
 *
 * This is just type omition to somewhat prevent users from defining parameters that
 * could negatively affect the addon behaviour across all stories.
 */
 export interface StoryThemeParameter {
  theme?: Pick<Parameters, 'default' | 'blurOnSelect' | 'disable' | 'ignoreQueryParams' | 'clearable'>;
}

export interface ThemeGlobals {
  /**
   * Selected theme id
   */
  theme?: string;
}
