/**
 * Name of the color for the chart line stroke and fill.
 */
export enum ChartLineColor {
  /**
   * Accent color for primary line
   */
  Red = 'red',

  /**
   * Accent color for secondary line
   */
  LightGrey = 'light-grey',

  /**
   * Blue series
   */
  Blue = 'blue',

  /**
   * Green series
   */
  Green = 'green',

  /**
   * Orange series
   */
  Orange = 'orange',

  /**
   * Violet series
   */
  Violet = 'violet',

  /**
   * Yellow series
   */
  Yellow = 'yellow',

  /**
   * Cyan series
   */
  Cyan = 'cyan',

  /**
   * Pink series
   */
  Pink = 'pink'
}

/**
 * Palette token or a hex color (`#RGB` / `#RRGGBB`).
 */
export type ChartLineColorToken = ChartLineColor | `#${string}`;

/**
 * Chart element in common case
 */
export interface ChartItem {
  /**
   * Timestamp of the data point
   */
  timestamp: number;

  /**
   * Value at the timestamp
   */
  count: number;
}

/**
 * Chart line with label and data points
 */
export interface ChartLine {
  /**
   * Series label (e.g., "accepted", "rate-limited")
   */
  label: string;

  /**
   * Data points for the series
   */
  data: ChartItem[];

  /**
   * Line color: a ChartLineColor token, or a hex string.
   * Defaults to red when omitted.
   */
  color?: ChartLineColorToken;
}

/**
 * A particular color params
 */
export interface ChartLineColors {
  /**
   * Name of the color (palette token or hex)
   */
  name: string;
  /**
   * Starting color for stroke gradient (top)
   */
  strokeStart: string;
  /**
   * Ending color for stroke gradient (bottom)
   */
  strokeEnd: string;
  /**
   * Starting color for fill gradient (top, with opacity)
   */
  fillStart: string;
  /**
   * Ending color for fill gradient (bottom, usually transparent)
   */
  fillEnd: string;

  /**
   * Pointer + legend color
   */
  pointerColor: string;
}
