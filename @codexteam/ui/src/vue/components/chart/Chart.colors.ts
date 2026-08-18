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
  {
    name: ChartLineColor.Blue,
    strokeStart: '#3F88FF',
    strokeEnd: '#424565',
    fillStart: 'rgba(63, 136, 255, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#3F88FF',
  },
  {
    name: ChartLineColor.Green,
    strokeStart: '#00C853',
    strokeEnd: '#424565',
    fillStart: 'rgba(0, 200, 83, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#00C853',
  },
  {
    name: ChartLineColor.Orange,
    strokeStart: '#FF8A3D',
    strokeEnd: '#424565',
    fillStart: 'rgba(255, 138, 61, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#FF8A3D',
  },
  {
    name: ChartLineColor.Violet,
    strokeStart: '#913BE6',
    strokeEnd: '#424565',
    fillStart: 'rgba(145, 59, 230, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#913BE6',
  },
  {
    name: ChartLineColor.Yellow,
    strokeStart: '#F5C542',
    strokeEnd: '#424565',
    fillStart: 'rgba(245, 197, 66, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#F5C542',
  },
  {
    name: ChartLineColor.Cyan,
    strokeStart: '#2EC4B6',
    strokeEnd: '#424565',
    fillStart: 'rgba(46, 196, 182, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#2EC4B6',
  },
  {
    name: ChartLineColor.Pink,
    strokeStart: '#FF5CA8',
    strokeEnd: '#424565',
    fillStart: 'rgba(255, 92, 168, 0.22)',
    fillEnd: 'rgba(66, 69, 101, 0)',
    pointerColor: '#FF5CA8',
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
  {
    name: ChartLineColor.Blue,
    strokeStart: '#4F94FF',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(79, 148, 255, 0.28)',
    fillEnd: 'rgba(190, 214, 255, 0)',
    pointerColor: '#4F94FF',
  },
  {
    name: ChartLineColor.Green,
    strokeStart: '#26A15F',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(38, 161, 95, 0.28)',
    fillEnd: 'rgba(168, 232, 198, 0)',
    pointerColor: '#26A15F',
  },
  {
    name: ChartLineColor.Orange,
    strokeStart: '#F07828',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(240, 120, 40, 0.28)',
    fillEnd: 'rgba(255, 210, 176, 0)',
    pointerColor: '#F07828',
  },
  {
    name: ChartLineColor.Violet,
    strokeStart: '#8B4BCB',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(139, 75, 203, 0.28)',
    fillEnd: 'rgba(234, 212, 255, 0)',
    pointerColor: '#8B4BCB',
  },
  {
    name: ChartLineColor.Yellow,
    strokeStart: '#D9A82E',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(217, 168, 46, 0.28)',
    fillEnd: 'rgba(255, 232, 176, 0)',
    pointerColor: '#D9A82E',
  },
  {
    name: ChartLineColor.Cyan,
    strokeStart: '#1AA89C',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(26, 168, 156, 0.28)',
    fillEnd: 'rgba(176, 232, 226, 0)',
    pointerColor: '#1AA89C',
  },
  {
    name: ChartLineColor.Pink,
    strokeStart: '#E94B93',
    strokeEnd: 'rgba(119, 136, 198, 0.4)',
    fillStart: 'rgba(233, 75, 147, 0.28)',
    fillEnd: 'rgba(255, 198, 222, 0)',
    pointerColor: '#E94B93',
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
 * @param color - hex color string
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
 * @param color - hex color string
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
