<template>
  <PageHeader>
    Chart
    <template #description>
      A component for displaying line charts with smooth curves and interactive tooltips.
    </template>
  </PageHeader>

  <div class="chart-props">
    <div class="chart-props__item">
      <h4 class="chart-props__name">
        lines
      </h4>
      <p class="chart-props__description">
        An array of line objects to display on the chart. Each line has
        <code>label</code>, <code>data</code> and optional <code>color</code>.
      </p>
    </div>

    <div class="chart-props__item">
      <h4 class="chart-props__name">
        lines[].color
      </h4>
      <p class="chart-props__description">
        Built-in palette token, or a hex override. Omit it and the line stays red.
      </p>
      <ul class="chart-props__list">
        <li>
          <code>red</code>, <code>light-grey</code>, <code>blue</code>,
          <code>green</code>, <code>orange</code>, <code>violet</code>,
          <code>yellow</code>, <code>cyan</code>, <code>pink</code>
        </li>
        <li>hex override: <code>'#7CFF6B'</code></li>
      </ul>
    </div>

    <div class="chart-props__item">
      <h4 class="chart-props__name">
        detalization
      </h4>
      <p class="chart-props__description">
        Grain of the X-axis and tooltip timestamps. Preview data follows the selected step.
      </p>
      <ul class="chart-props__list">
        <li><code>'days'</code> — 30 daily points, labels like "19 dec"</li>
        <li><code>'hours'</code> — 24 hourly points, labels like "19 dec, 14:00"</li>
        <li><code>'minutes'</code> — 60 minute points, labels like "14:30"</li>
      </ul>
      <div class="chart-props__control">
        <span class="chart-props__control-label">Try it:</span>
        <Select
          v-model="detalizationSelected"
          :align="{ vertically: 'below', horizontally: 'left' }"
          :is-disabled="false"
          :items="detalizationItems"
        />
      </div>
    </div>

    <div class="chart-props__item">
      <h4 class="chart-props__name">
        legend
      </h4>
      <p class="chart-props__description">
        Static series legend under the chart: color dot + <code>label</code> for each line.
        Off by default so existing layouts stay the same.
      </p>
    </div>
  </div>

  <Heading :level="3">
    Single Line
  </Heading>
  <div class="chart-example">
    <div class="chart-example__toolbar">
      <span class="chart-props__control-label">color:</span>
      <Select
        v-model="singleLineColorSelected"
        :align="{ vertically: 'below', horizontally: 'left' }"
        :is-disabled="false"
        :items="paletteColorItems"
      />
      <span class="chart-props__control-label">legend:</span>
      <Switch
        v-model="legendEnabled"
        :value="legendEnabled"
      />
    </div>
    <div class="chart-example__showcase">
      <Chart
        :lines="[singleLineData]"
        :detalization="currentDetalization"
        :legend="legendEnabled"
      />
    </div>
  </div>

  <Heading :level="3">
    Shared scale
  </Heading>
  <p class="chart-example-note">
    Both series hit <code>50</code> on the same tick. They must sit on one horizontal line.
  </p>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="sharedScaleData"
        :detalization="currentDetalization"
        :legend="true"
      />
    </div>
  </div>

  <Heading :level="3">
    Single spike
  </Heading>
  <p class="chart-example-note">
    One non-zero point among zeros — should still show as a marker.
  </p>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="spikeData"
        :detalization="currentDetalization"
        :legend="true"
      />
    </div>
  </div>

  <Heading :level="3">
    Stacked
  </Heading>
  <p class="chart-example-note">
    Many-series on top (tooltip can overlap the chart below). Some ticks have only one or two non-zero series.
  </p>
  <div class="chart-example chart-example--stack">
    <div class="chart-example__showcase">
      <Chart
        :lines="paletteSeriesData"
        :detalization="currentDetalization"
        :legend="true"
      />
    </div>
    <div class="chart-example__showcase">
      <Chart
        :lines="multipleLinesData"
        :detalization="currentDetalization"
        :legend="true"
      />
    </div>
  </div>

  <Heading :level="3">
    Palette
  </Heading>
  <p class="chart-example-note">
    Every hardcoded <code>ChartLineColor</code> token on one chart. No hex.
  </p>
  <div class="chart-example chart-example--tall">
    <div class="chart-example__showcase">
      <Chart
        :lines="paletteSeriesData"
        :detalization="currentDetalization"
        :legend="true"
      />
    </div>
  </div>

  <Heading :level="3">
    Hex override
  </Heading>
  <p class="chart-example-note">
    Same series as Single Line, but <code>color: '#7CFF6B'</code>.
  </p>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="[hexLineData]"
        :detalization="currentDetalization"
        :legend="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import { Chart, ChartLineColor, Heading, Select, Switch } from '../../../src/vue';
import type { ChartItem, ChartLine } from '../../../src/vue/components/chart';
import type { ContextMenuItem, DefaultItem } from '../../../src/vue/components/context-menu/ContextMenu.types';

/**
 * Detalization types for chart timestamp formatting
 */
type DetalizationValue = 'minutes' | 'hours' | 'days';

/**
 * Mapping from Select title to detalization value
 */
const detalizationMap: Record<string, DetalizationValue> = {
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
};

/**
 * Axis step for each detalization
 */
const detalizationConfig: Record<DetalizationValue, {
  points: number;
  intervalSeconds: number;
}> = {
  days: {
    points: 30,
    intervalSeconds: 86400,
  },
  hours: {
    points: 24,
    intervalSeconds: 3600,
  },
  minutes: {
    points: 60,
    intervalSeconds: 60,
  },
};

/**
 * Shared timestamps aligned to the selected detalization bucket
 *
 * @param points - Number of ticks
 * @param intervalSeconds - Step between ticks
 */
function generateTimestamps(points: number, intervalSeconds: number): number[] {
  const now = Math.floor(Date.now() / 1000);
  const aligned = now - (now % intervalSeconds);

  return Array.from({ length: points }, (_, i) => aligned - (points - 1 - i) * intervalSeconds);
}

/**
 * Generate sample chart data
 *
 * @param timestamps - Shared axis timestamps
 * @param baseValue - Base value for random count generation
 */
function generateData(timestamps: number[], baseValue = 100): ChartItem[] {
  return timestamps.map(timestamp => ({
    timestamp,
    count: Math.floor(Math.random() * baseValue) + Math.floor(baseValue / 2),
  }));
}

/**
 * Empty handler for select option activation
 */
const onActivate = (): void => {};

/**
 * Currently selected detalization option
 */
const detalizationSelected = ref<DefaultItem>({
  title: 'days',
  onActivate,
});

/**
 * Legend toggle for the Single Line preview
 */
const legendEnabled = ref(false);

/**
 * Available detalization options for the Select component
 */
const detalizationItems: ContextMenuItem[] = [
  { title: 'days',
    onActivate },
  { title: 'hours',
    onActivate },
  { title: 'minutes',
    onActivate },
];

/**
 * Current detalization value derived from selected option
 */
const currentDetalization = computed<DetalizationValue>(() => {
  return detalizationMap[detalizationSelected.value.title] || 'days';
});

/**
 * One axis for all preview charts, matching the selected detalization
 */
const demoTimestamps = computed((): number[] => {
  const { points, intervalSeconds } = detalizationConfig[currentDetalization.value];

  return generateTimestamps(points, intervalSeconds);
});

/**
 * Built-in palette tokens, same order as ChartLineColor
 */
const paletteTokens: ChartLineColor[] = Object.values(ChartLineColor);

/**
 * Fast lookup for Select titles
 */
const paletteTokenSet = new Set<string>(paletteTokens);

/**
 * Color picker for the single-line preview
 */
const singleLineColorSelected = ref<DefaultItem>({
  title: ChartLineColor.Red,
  onActivate,
});

/**
 * Palette options for the Single Line select
 */
const paletteColorItems: ContextMenuItem[] = paletteTokens.map(title => ({
  title,
  onActivate,
}));

/**
 * Keep points stable when only the color token changes
 */
const singleLinePoints = computed((): ChartItem[] => {
  return generateData(demoTimestamps.value, 2000);
});

/**
 * Single line chart data
 */
const singleLineData = computed<ChartLine>(() => {
  const title = singleLineColorSelected.value.title;
  const color = paletteTokenSet.has(title)
    ? title as ChartLineColor
    : ChartLineColor.Red;

  return {
    label: title,
    data: singleLinePoints.value,
    color,
  };
});

/**
 * Hex override demo — same points as Single Line
 */
const hexLineData = computed<ChartLine>(() => {
  return {
    label: '#7CFF6B',
    data: singleLinePoints.value,
    color: '#7CFF6B',
  };
});

/**
 * Multiple lines chart data - accepted and filtered events
 */
const multipleLinesData = computed<ChartLine[]>(() => {
  const timestamps = demoTimestamps.value;

  return [
    {
      label: 'accepted',
      data: generateData(timestamps, 150),
      color: ChartLineColor.Red,
    },
    {
      label: 'filtered',
      data: generateData(timestamps, 50),
      color: ChartLineColor.LightGrey,
    },
  ];
});

/**
 * Two ranges, same count on one tick — must share Y
 */
const sharedScaleData = computed<ChartLine[]>(() => {
  const timestamps = demoTimestamps.value;
  const mid = Math.floor(timestamps.length / 2);

  return [
    {
      label: 'wide',
      color: ChartLineColor.Red,
      data: timestamps.map((timestamp, index) => ({
        timestamp,
        count: index === mid ? 50 : 180,
      })),
    },
    {
      label: 'narrow',
      color: ChartLineColor.Blue,
      data: timestamps.map((timestamp, index) => ({
        timestamp,
        count: index === mid ? 50 : 20,
      })),
    },
  ];
});

/**
 * One event among zeros
 */
const spikeData = computed<ChartLine[]>(() => {
  const timestamps = demoTimestamps.value;
  const mid = Math.floor(timestamps.length / 2);

  return [
    {
      label: 'incident',
      color: ChartLineColor.Orange,
      data: timestamps.map((timestamp, index) => ({
        timestamp,
        count: index === mid ? 90 : 0,
      })),
    },
  ];
});

/**
 * Long labels to check tooltip ellipsis
 */
const longPreviewLabels: Partial<Record<ChartLineColor, string>> = {
  [ChartLineColor.Red]: 'accepted-events-from-the-ingestion-pipeline',
  [ChartLineColor.LightGrey]: 'rate-limited-requests-waiting-in-queue',
};

/**
 * All hardcoded palette tokens stacked for comparison
 */
const paletteSeriesData = computed<ChartLine[]>(() => {
  const timestamps = demoTimestamps.value;
  const bases = [150, 130, 110, 95, 80, 70, 55, 40, 25];

  return paletteTokens.map((color, seriesIndex) => ({
    label: longPreviewLabels[color] ?? color,
    color,
    data: timestamps.map((timestamp, tick) => {
      const activeSeries = (tick % 7) + 1;
      const count = seriesIndex < activeSeries
        ? Math.floor(Math.random() * (bases[seriesIndex] ?? 50)) + 10
        : 0;

      return {
        timestamp,
        count,
      };
    }),
  }));
});
</script>

<style scoped>
.chart-props {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  margin-bottom: var(--spacing-xl);

  &__item {
    padding: var(--spacing-m);
    background-color: var(--base--bg-secondary);
    border-radius: var(--radius-m);
  }

  &__name {
    margin: 0 0 var(--spacing-s);
  }

  &__description {
    margin: 0 0 var(--spacing-s);
    color: var(--base--text-secondary);

    code {
      padding: var(--spacing-xxs) var(--spacing-ms);
      background-color: var(--base--bg-primary);
      border-radius: var(--radius-s);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    margin: 0 0 var(--spacing-m);
    padding-left: var(--spacing-l);
    color: var(--base--text-secondary);

    code {
      padding: var(--spacing-xxs) var(--spacing-ms);
      background-color: var(--base--bg-primary);
      border-radius: var(--radius-s);
    }
  }

  &__control {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
  }

  &__control-label {
    color: var(--base--text-secondary);
  }
}

.chart-example-note {
  margin: 0 0 var(--spacing-m);
  color: var(--base--text-secondary);
}

.chart-example {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);
  margin: 0 0 var(--spacing-xxl);
  position: relative;

  &__toolbar {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
  }

  &__showcase {
    width: 100%;
    background-color: var(--base--bg-secondary);
    border-radius: var(--radius-m);
  }

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 180px;
  }

  &--tall {
    padding-bottom: 240px;
  }

  &--stack {
    gap: var(--spacing-m);
  }
}
</style>
