<template>
  <div
    :class="[
      $style.chart,
      hoveredIndex >= 0 && $style['chart--raised']
    ]"
  >
    <div
      ref="plot"
      :class="$style.chart__plot"
      @mousemove.passive="moveTooltip"
      @mouseleave.passive="leavePlot"
    >
      <svg
        ref="chart"
        :class="$style.chart__body"
      >
        <ChartLine
          v-for="(preparedLine, index) in preparedLines"
          :key="`chart-line-${index}`"
          :points="preparedLine.line.data"
          :color="preparedLine.line.color"
          :chart-width="chartWidth"
          :chart-height="chartHeight"
          :min-value="preparedLine.min"
          :max-value="preparedLine.max"
          :step-x="stepX"
          :label="preparedLine.line.label"
        />
      </svg>
      <div
        :class="$style.chart__ox"
      >
        <div
          :class="$style['chart__ox-inner']"
        >
          <span
            v-for="item in visibleLegendPoints"
            :key="item.index"
            :class="$style['chart__ox-item']"
            :style="{ left: `${item.index * stepX}px`, transform: 'translateX(-50%)' }"
          >
            {{ formatAxisTimestamp(item.point.timestamp * 1000, item.includeDate) }}
          </span>
        </div>
      </div>
      <div
        v-if="hoveredIndex >= 0 && hoveredIndex < firstLineData.length"
        :style="{ transform: `translateX(${pointerLeft}px)` }"
        :class="$style.chart__pointer"
      >
        <template
          v-for="(preparedLine, index) in preparedLines"
          :key="`cursor-${preparedLine.line.label}-${index}`"
        >
          <div
            :style="{
              transform: `translateY(${getLinePointerTop(preparedLine)}px)`,
              backgroundColor: getCursorColor(preparedLine.line)
            }"
            :class="$style['chart__pointer-cursor']"
          />
        </template>
        <div
          :class="[
            $style['chart__pointer-tooltip'],
            tooltipAlignment === 'left' && $style['chart__pointer-tooltip--left'],
            tooltipAlignment === 'right' && $style['chart__pointer-tooltip--right']
          ]"
          :style="{ minWidth: `${tooltipMinWidth}px` }"
          @mousemove.stop
          @mouseenter="pinTooltip"
          @mouseleave="unpinTooltip"
        >
          <div :class="$style['chart__pointer-tooltip-date']">
            {{ formatTimestamp(firstLineData[hoveredIndex].timestamp * 1000) }}
          </div>
          <div
            :class="$style['chart__pointer-tooltip-list']"
            @wheel.stop
          >
            <div
              v-for="item in tooltipLines"
              :key="`tooltip-line-${item.prepared.index}`"
              :class="$style['chart__pointer-tooltip-number']"
            >
              <span
                :class="$style['chart__pointer-tooltip-dot']"
                :style="{ backgroundColor: getCursorColor(item.prepared.line) }"
              />
              <span :class="$style['chart__pointer-tooltip-metrics']">
                <span
                  :key="`tooltip-value-${item.prepared.index}-${item.value}`"
                  :class="$style['chart__pointer-tooltip-value']"
                >
                  {{ formatSpacedNumber(item.value) }}
                </span>
                <span
                  :class="$style['chart__pointer-tooltip-label']"
                  :title="item.prepared.line.label"
                >
                  {{ item.prepared.line.label }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="legend"
      :class="$style.chart__legend"
    >
      <div
        v-for="(preparedLine, index) in preparedLines"
        :key="`legend-${preparedLine.line.label}-${index}`"
        :class="$style['chart__legend-item']"
        :title="preparedLine.line.label"
      >
        <span
          :class="$style['chart__legend-dot']"
          :style="{ backgroundColor: getCursorColor(preparedLine.line) }"
        />
        {{ preparedLine.line.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ChartItem, ChartLineColors, ChartLine as ChartLineInterface } from './Chart.types';
import { chartColorsDark, chartColorsLight, resolveChartLineColor } from './Chart.colors';
import { ColorScheme, useTheme } from '../../composables/useTheme';
import ChartLine from './ChartLine.vue';
import { throttle } from '../../utils';

/**
 * Prepared line with precomputed min/max
 */
interface PreparedLine {
  line: ChartLineInterface;
  min: number;
  max: number;
  index: number;
}

interface Props {
  /**
   * List of lines for displaying on the chart
   */
  lines?: ChartLineInterface[];

  /**
   * Detalization of the chart affects the X-axis and tooltip display
   */
  detalization?: 'minutes' | 'hours' | 'days';

  /**
   * Show a static color legend below the chart (dots + series labels)
   */
  legend?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  lines: () => [] as ChartLineInterface[],
  detalization: 'days',
  legend: false,
});

/**
 * Current color scheme from theme system
 */
const { colorScheme } = useTheme();

/**
 * Palette for current color scheme
 */
const chartColorsPalette = computed<ChartLineColors[]>(() => {
  return colorScheme.value === ColorScheme.Light
    ? chartColorsLight
    : chartColorsDark;
});

/**
 * Chart SVG clientWidth
 */
const chartWidth = ref(0);

/**
 * Chart SVG clientHeight
 */
const chartHeight = ref(0);

/**
 * Hovered point index
 */
const hoveredIndex = ref(-1);

/**
 * Chart SVG element ref
 */
const chart = ref<SVGElement | null>(null);

/**
 * Plot wrapper — used to know whether the cursor left the chart or just entered the tooltip
 */
const plot = ref<HTMLElement | null>(null);

/**
 * Cursor is over the tooltip: keep the last point, do not scrub
 */
const tooltipPinned = ref(false);

/**
 * Cached chart left position for performance
 */
const chartLeft = ref(0);

/**
 * Shared Y scale so identical counts sit on the same height
 */
const chartValueScale = computed((): { min: number; max: number } => {
  let max = 0;

  for (const line of props.lines) {
    for (const item of line.data ?? []) {
      const value = item.count ?? 0;

      if (value > max) {
        max = value;
      }
    }
  }

  return {
    min: 0,
    max: max > 0 ? max * 1.5 : 1,
  };
});

/**
 * Precomputed line data with shared min/max
 */
const preparedLines = computed((): PreparedLine[] => {
  const { min, max } = chartValueScale.value;

  return props.lines.map((line, index) => ({
    line,
    min,
    max,
    index,
  }));
});

/**
 * Width of x-legend item
 */
const xLegendWidth = computed((): number => {
  switch (props.detalization) {
    case 'days':
      return 50;
    case 'hours':
      return 56;
    case 'minutes':
      return 50;
    default:
      return 55;
  }
});

/**
 * First line of the chart.
 * Used for calculating stepX
 */
const firstLine = computed((): ChartLineInterface => {
  return props.lines[0];
});

/**
 * Data of the first line of the chart.
 * Used for calculating stepX (and other common properties across all lines)
 */
const firstLineData = computed((): ChartItem[] => {
  if (!firstLine.value) {
    return [];
  }

  return firstLine.value.data;
});

/**
 * Step for OX axis
 */
const stepX = computed((): number => {
  if (firstLineData.value.length <= 1) {
    return 0;
  }

  return chartWidth.value / (firstLineData.value.length - 1);
});

/**
 * Calculate the step for displaying x-legend items to prevent overflow
 * Returns how many items to skip between displayed items
 */
const visibleXLegendItems = computed((): number => {
  if (!chartWidth.value || !firstLineData.value.length) {
    return 1;
  }

  const maxItems = Math.floor(chartWidth.value / xLegendWidth.value);

  if (maxItems >= firstLineData.value.length) {
    return 1;
  }

  return Math.max(1, Math.ceil(firstLineData.value.length / maxItems));
});

/**
 * Filtered points to display in x-legend based on visibleXLegendItems step
 */
const visibleLegendPoints = computed((): Array<{
  point: ChartItem;
  index: number;
  includeDate: boolean;
}> => {
  const step = visibleXLegendItems.value;
  const result: Array<{
    point: ChartItem;
    index: number;
  }> = [];

  for (let i = 0; i < firstLineData.value.length; i = i + step) {
    result.push({
      point: firstLineData.value[i],
      index: i,
    });
  }

  /* Ensure the last point is always included */
  const lastIndex = firstLineData.value.length - 1;

  if (result.length > 0 && result[result.length - 1].index !== lastIndex) {
    result.push({
      point: firstLineData.value[lastIndex],
      index: lastIndex,
    });
  }

  /*
   * First/last ticks are hidden in CSS. For minutes, put the calendar day
   * on the first actually visible tick, and again if the day changes.
   */
  return result.map((item, i) => {
    const date = new Date(item.point.timestamp * 1000);
    const prev = i > 0 ? new Date(result[i - 1].point.timestamp * 1000) : null;
    const dayChanged = prev !== null && (
      prev.getFullYear() !== date.getFullYear()
      || prev.getMonth() !== date.getMonth()
      || prev.getDate() !== date.getDate()
    );

    return {
      ...item,
      includeDate: props.detalization === 'minutes' && (i === 1 || dayChanged),
    };
  });
});

/**
 * Left coordinate of hover pointer
 */
const pointerLeft = computed((): number => {
  return hoveredIndex.value * stepX.value;
});

/**
 * Tooltip rows sorted by value desc (highest first)
 */
const tooltipLines = computed((): Array<{
  prepared: PreparedLine;
  value: number;
}> => {
  if (hoveredIndex.value < 0) {
    return [];
  }

  return preparedLines.value
    .map(prepared => ({
      prepared,
      value: getLineValueAtHoveredIndex(prepared.line, hoveredIndex.value),
    }))
    .sort((a, b) => b.value - a.value);
});

/**
 * Tooltip width cap, same as CSS max-width
 */
const TOOLTIP_MAX_WIDTH_PX = 220;

/**
 * Tooltip min-width based on the longest visible series row
 */
const tooltipMinWidth = computed((): number => {
  if (hoveredIndex.value < 0 || !firstLineData.value[hoveredIndex.value]) {
    return 100;
  }

  const dateLabel = formatTimestamp(firstLineData.value[hoveredIndex.value].timestamp * 1000);
  let maxLength = dateLabel.length;

  for (const item of tooltipLines.value) {
    const row = `${formatSpacedNumber(item.value)} ${item.prepared.line.label}`;

    if (row.length > maxLength) {
      maxLength = row.length;
    }
  }

  return Math.min(TOOLTIP_MAX_WIDTH_PX, maxLength * 5.6 + 28);
});

/**
 * Tooltip alignment class based on position to prevent overflow
 */
const tooltipAlignment = computed((): string => {
  const estimatedTooltipWidth = tooltipMinWidth.value;
  const pointerX = hoveredIndex.value * stepX.value;

  if (pointerX < estimatedTooltipWidth / 2) {
    /* Near left edge - align tooltip to the left */
    return 'left';
  } else if (pointerX > chartWidth.value - estimatedTooltipWidth / 2) {
    /* Near right edge - align tooltip to the right */
    return 'right';
  }

  /* Default center alignment */
  return 'center';
});

/**
 * Compute and save chart wrapper width
 */
function computeWrapperSize(): void {
  const strokeWidth = 2;
  const svg = chart.value as SVGElement;

  if (!svg) {
    chartWidth.value = 0;
    chartHeight.value = 0;
    chartLeft.value = 0;

    return;
  }

  chartWidth.value = svg.clientWidth;
  chartHeight.value = svg.clientHeight - strokeWidth;
  chartLeft.value = svg.getBoundingClientRect().left;
}

/**
 * Handler for window resize
 */
function windowResized(): void {
  computeWrapperSize();
}

/**
 * Handler of window resize
 */
const onResize = throttle(windowResized, 200);

/**
 * Moves tooltip to the hovered point
 *
 * @param event - mousemove
 */
function moveTooltip(event: MouseEvent): void {
  if (tooltipPinned.value) {
    return;
  }

  if (firstLineData.value.length === 0) {
    hoveredIndex.value = -1;

    return;
  }

  if (stepX.value === 0) {
    hoveredIndex.value = -1;

    return;
  }

  const chartX = chartLeft.value;
  const cursorX = event.clientX - chartX;

  const newIndex = Math.round(cursorX / stepX.value);
  const clampedIndex = Math.max(0, Math.min(firstLineData.value.length - 1, newIndex));

  hoveredIndex.value = clampedIndex;
}

/**
 * Hide hover UI when the cursor leaves the plot, unless it entered the tooltip
 */
function leavePlot(): void {
  if (tooltipPinned.value) {
    return;
  }

  hoveredIndex.value = -1;
}

/**
 * Freeze the hovered point while the cursor is on the tooltip
 */
function pinTooltip(): void {
  tooltipPinned.value = true;
}

/**
 * Resume scrubbing if the cursor returned to the plot, otherwise hide
 *
 * @param event - tooltip mouseleave
 */
function unpinTooltip(event: MouseEvent): void {
  tooltipPinned.value = false;

  const next = event.relatedTarget;

  if (!(next instanceof Node) || plot.value?.contains(next) !== true) {
    hoveredIndex.value = -1;
  }
}

/**
 * Get the Y coordinate for a line's pointer cursor at the hovered index
 * Uses precomputed min/max from PreparedLine
 *
 * @param prepared - the prepared line with precomputed values
 */
function getLinePointerTop(prepared: PreparedLine): number {
  if (hoveredIndex.value === -1 || !prepared.line.data || prepared.line.data.length === 0) {
    return 0;
  }

  const point = prepared.line.data[hoveredIndex.value];

  if (!point) {
    return 0;
  }

  const lineKY = prepared.max === prepared.min
    ? 1
    : chartHeight.value / (prepared.max - prepared.min);

  const currentValue = point.count ?? 0;

  return chartHeight.value - (currentValue - prepared.min) * lineKY;
}

/**
 * Get the value for a line at the hovered index
 *
 * @param line - the chart line
 * @param index - hovered index
 */
function getLineValueAtHoveredIndex(line: ChartLineInterface, index: number): number {
  if (!line || !line.data || index < 0 || index >= line.data.length) {
    return 0;
  }

  const point = line.data[index];

  if (!point) {
    return 0;
  }

  return point.count || 0;
}

/**
 * Pointer / legend / tooltip dot color for a series
 *
 * @param line - the chart line
 */
function getCursorColor(line: ChartLineInterface): string {
  return resolveChartLineColor(line.color, chartColorsPalette.value).pointerColor;
}

const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Compact axis label. Minutes get the date on the first visible tick (and on day change).
 *
 * @param timestamp - timestamp in milliseconds
 * @param includeDate - prepend day + month
 */
function formatAxisTimestamp(timestamp: number, includeDate = false): string {
  const date = new Date(timestamp);
  const paddedHours = date.getHours()
    .toString()
    .padStart(2, '0');
  const paddedMinutes = date.getMinutes()
    .toString()
    .padStart(2, '0');
  const time = `${paddedHours}:${paddedMinutes}`;
  const dayMonth = `${date.getDate()} ${shortMonths[date.getMonth()]}`;

  if (props.detalization === 'days') {
    return dayMonth;
  }

  if (includeDate) {
    return `${dayMonth}, ${time}`;
  }

  return time;
}

/**
 * Tooltip timestamp: date+time for hours and minutes, date for days.
 *
 * @param timestamp - timestamp in milliseconds
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = shortMonths[date.getMonth()];
  const paddedHours = date.getHours()
    .toString()
    .padStart(2, '0');
  const paddedMinutes = date.getMinutes()
    .toString()
    .padStart(2, '0');
  const time = `${paddedHours}:${paddedMinutes}`;

  switch (props.detalization) {
    case 'minutes':
    case 'hours':
      return `${day} ${month}, ${time}`;
    case 'days':
    default:
      return `${day} ${month}`;
  }
}

/**
 * Formats number with spaces
 *
 * @param value - number value
 */
function formatSpacedNumber(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}

onMounted(() => {
  /**
   * Cache wrapper width
   */
  computeWrapperSize();

  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style module lang="postcss">
@import '@/styles/typography.pcss';

.chart {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  overflow: visible;
  background-color: var(--base--bg-secondary);
  border-radius: var(--radius-s);

  --legend-height: var(--spacing-xxl);
  --legend-block-padding: var(--spacing-s);
}

.chart--raised {
  z-index: var(--z-popover);
}

.chart__plot {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 215px;
  overflow: visible;
}

.chart__body {
  flex-grow: 2;
}

.chart__ox {
  height: var(--legend-height);
  padding-block: var(--legend-block-padding);
  box-sizing: border-box;
}

.chart__ox-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart__ox-item {
  position: absolute;
  left: 0;
  color: var(--base--text);
  @apply --text-ui-small;
  text-align: center;
  opacity: 0.3;
  white-space: nowrap;
}

.chart__ox-item:first-of-type,
.chart__ox-item:last-of-type {
  display: none;
}

.chart__pointer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--z-popover);
  width: 3px;
  height: 100%;
  margin-left: -1.5px;
  background-color: rgba(25, 28, 37, 0.5);
  animation: pointer-in 200ms ease;
  will-change: opacity, transform;
}

.chart__pointer-cursor {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--spacing-xs);
  height: var(--spacing-xs);
  margin-top: calc(var(--spacing-xs) / -2);
  margin-left: calc(var(--spacing-xs) / -2);
  border-radius: 50%;
  will-change: transform;
}

.chart__pointer-tooltip {
  --tooltip-block-padding: var(--spacing-xxs);

  position: absolute;
  top: calc(100% - var(--legend-height) + var(--legend-block-padding) - var(--tooltip-block-padding) - var(--delimiter-height));
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding-block: var(--tooltip-block-padding);
  padding-inline: var(--spacing-xs);
  max-width: 220px;
  color: var(--base--text);
  @apply --text-ui-small;
  white-space: nowrap;
  background: var(--base--bg-primary);
  border-radius: var(--radius-s);
  box-shadow: 0 var(--spacing-s) var(--spacing-m) 0 rgba(0, 0, 0, 0.12);
  transform: translateX(-50%);
  transition: min-width 150ms ease;
}

.chart__pointer-tooltip--left {
  left: 0;
  transform: translateX(0);
}

.chart__pointer-tooltip--right {
  right: 0;
  left: auto;
  transform: translateX(0);
}

.chart__legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-s) var(--spacing-ml);
  padding: 0 var(--spacing-ml) var(--spacing-m);
}

.chart__legend-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--base--text-secondary);
  @apply --text-ui-small;
  white-space: nowrap;
}

.chart__pointer-tooltip-date {
  color: var(--base--text-secondary);
  text-align: center;
}

.chart__pointer-tooltip-list {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: var(--spacing-xs);
  line-height: 1;

  &:has(> :nth-child(6)) {
    max-height: calc(5lh + 4 * var(--spacing-xs));
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: var(--spacing-xxs);
    }
  }
}

.chart__pointer-tooltip-number {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 0;
  gap: var(--spacing-xs);
  height: 1lh;
  line-height: 1;
}

.chart__pointer-tooltip-metrics {
  display: flex;
  align-items: baseline;
  min-width: 0;
  flex: 1;
  gap: var(--spacing-xs);
}

.chart__pointer-tooltip-value,
.chart__pointer-tooltip-label {
  line-height: 1;
}

.chart__pointer-tooltip-value {
  flex-shrink: 0;
  color: var(--base--text);
  animation: tooltip-value-in 500ms ease;
}

.chart__pointer-tooltip-label {
  min-width: 0;
  overflow: hidden;
  color: var(--base--text-secondary);
  text-overflow: ellipsis;
}

.chart__legend-dot,
.chart__pointer-tooltip-dot {
  flex-shrink: 0;
  width: var(--spacing-xs);
  height: var(--spacing-xs);
  border-radius: 50%;
}

@keyframes tooltip-value-in {
  from {
    transform: translateY(-5px);
  }

  to {
    transform: none;
  }
}

@keyframes pointer-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
