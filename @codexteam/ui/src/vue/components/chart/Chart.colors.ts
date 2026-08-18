import { ChartLineColor } from './Chart.types';
import type { ChartLineColorToken, ChartLineColors } from './Chart.types';

/**
 * Max value of an RGB channel
 */
const RGB_CHANNEL_MAX = 255;

/**
 * Radix for hex color strings
 */
const HEX_RADIX = 16;

/**
 * Byte width in a #RRGGBB string (two hex digits)
 */
const HEX_BYTE_LENGTH = 2;

/**
 * Start of the green byte in #RRGGBB (without '#')
 */
const HEX_GREEN_OFFSET = 2;

/**
 * Start of the blue byte in #RRGGBB (without '#')
 */
const HEX_BLUE_OFFSET = 4;

/**
 * Length of the #RRGGBB payload (without '#')
 */
const HEX_RGB_LENGTH = 6;

/**
 * Palette name for the default series color
 */
const RED_TOKEN: string = ChartLineColor.Red;

/**
 * Colors for dark color scheme.
 */
export const chartColorsDark: ChartLineColors[] = [
  {
    name: ChartLineColor.LightGrey,
    strokeStart: 'rgba(75, 90, 121, 0.33)',
    strokeEnd: 'rgba(71, 72, 85, 0.16)',
    fillStart: 'rgba(63, 136, 255, 0.01)',
    fillEnd: 'rgba(66, 78, 93, 0.05)',
    pointerColor: '#717289',
  },
  {
    name: ChartLineColor.Red,
    strokeStart: '#FF2E51',
    strokeEnd: '#424565',
    fillStart: 'rgba(255, 46, 81, 0.3)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#FF2E51',
  },
];

/**
 * Colors for light color scheme.
 */
export const chartColorsLight: ChartLineColors[] = [
  {
    name: ChartLineColor.LightGrey,
    strokeStart: 'rgba(75, 90, 121, 0.22)',
    strokeEnd: 'rgba(71, 72, 85, 0.08)',
    fillStart: 'rgba(225, 236, 255, 0.12)',
    fillEnd: 'rgba(66, 78, 93, 0.02)',
    pointerColor: '#717289',
  },
  {
    name: ChartLineColor.Red,
    strokeStart: '#FF4A68',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(255, 94, 121, 0.46)',
    fillEnd: 'rgba(255, 190, 198, 0)',
    pointerColor: '#FF4A68',
  },
];

/**
 * Clamp a color channel to 0–255
 * @param value - parsed channel
 */
function clampChannel(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(RGB_CHANNEL_MAX, Math.round(value)));
}

/**
 * Parse #RGB or #RRGGBB only. Anything else is rejected — never pass raw CSS through.
 * @param color - CSS color string
 */
function parseHexColor(color: string): { r: number; g: number; b: number } | null {
  const value = color.trim();
  const shortHex = /^#([0-9a-fA-F]{3})$/.exec(value);

  if (shortHex) {
    const [r, g, b] = shortHex[1].split('');

    return {
      r: parseInt(r + r, HEX_RADIX),
      g: parseInt(g + g, HEX_RADIX),
      b: parseInt(b + b, HEX_RADIX),
    };
  }

  const longHex = /^#([0-9a-fA-F]{6})$/.exec(value);

  if (longHex) {
    const payload = longHex[1];

    return {
      r: parseInt(payload.slice(0, HEX_GREEN_OFFSET), HEX_RADIX),
      g: parseInt(payload.slice(HEX_GREEN_OFFSET, HEX_BLUE_OFFSET), HEX_RADIX),
      b: parseInt(payload.slice(HEX_BLUE_OFFSET, HEX_RGB_LENGTH), HEX_RADIX),
    };
  }

  return null;
}

/**
 * Format a 0–255 channel as two hex digits
 * @param channel - clamped RGB channel
 */
function channelToHex(channel: number): string {
  return channel.toString(HEX_RADIX)
    .padStart(HEX_BYTE_LENGTH, '0');
}

/**
 * Build a gradient set from a hex color. Returns null if the string is not a hex.
 * @param color - CSS color string
 */
export function createChartLineColorsFromCss(color: string): ChartLineColors | null {
  const parsed = parseHexColor(color);

  if (!parsed) {
    return null;
  }

  const r = clampChannel(parsed.r);
  const g = clampChannel(parsed.g);
  const b = clampChannel(parsed.b);

  return {
    name: `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`,
    strokeStart: `rgb(${r}, ${g}, ${b})`,
    strokeEnd: `rgba(${r}, ${g}, ${b}, 0.22)`,
    fillStart: `rgba(${r}, ${g}, ${b}, 0.26)`,
    fillEnd: `rgba(${r}, ${g}, ${b}, 0)`,
    pointerColor: `rgb(${r}, ${g}, ${b})`,
  };
}

/**
 * Resolve a line color: palette token or hex. Invalid values fall back to red.
 * @param color - palette token or hex
 * @param palette - dark/light chart palette
 */
export function resolveChartLineColor(
  color: ChartLineColorToken | undefined,
  palette: ChartLineColors[]
): ChartLineColors {
  const fallback = palette.find(item => item.name === RED_TOKEN) ?? palette[0];
  const colorName: string = color ?? ChartLineColor.Red;
  const fromPalette = palette.find(item => item.name === colorName);

  if (fromPalette) {
    return fromPalette;
  }

  return createChartLineColorsFromCss(colorName) ?? fallback;
}
