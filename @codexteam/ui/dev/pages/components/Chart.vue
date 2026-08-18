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
        <code>ChartLineColor.Red</code> / <code>ChartLineColor.LightGrey</code>,
        or any CSS color string (<code>'#3F88FF'</code>, <code>'rgb(...)'</code>).
        Omit it and the line stays red.
      </p>
      <ul class="chart-props__list">
        <li><code>red</code>, <code>light-grey</code> — built-in palette</li>
        <li>any CSS color: <code>'#3F88FF'</code>, <code>'#00C853'</code></li>
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
      <div class="chart-props__control">
        <span class="chart-props__control-label">Try it:</span>
        <Switch
          v-model="legendEnabled"
          :value="legendEnabled"
        />
      </div>
    </div>
  </div>

  <Heading :level="3">
    Single Line
  </Heading>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="[singleLineData]"
        :detalization="currentDetalization"
        :legend="legendEnabled"
      />
    </div>
  </div>

  <Heading :level="3">
    Multiple Lines
  </Heading>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="multipleLinesData"
        :detalization="currentDetalization"
        :legend="legendEnabled"
      />
    </div>
  </div>

  <Heading :level="3">
    Many Series
  </Heading>
  <p class="chart-example-note">
    Extra series via hex strings. Legend below, tooltip grows down from the axis.
  </p>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="manySeriesData"
        :detalization="currentDetalization"
        :legend="legendEnabled"
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
 * Toggle static series legend in the preview
 */
const legendEnabled = ref(true);

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
 * Single line chart data - 30 days of events
 */
const singleLineData = computed<ChartLine>(() => {
  return {
    label: 'events',
    data: generateData(demoTimestamps.value, 2000),
    color: ChartLineColor.Red,
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
 * Many series — built-in red/grey plus hex colors
 */
const manySeriesData = computed<ChartLine[]>(() => {
  const timestamps = demoTimestamps.value;

  return [
    {
      label: 'accepted',
      data: generateData(timestamps, 150),
      color: ChartLineColor.Red,
    },
    {
      label: 'filtered',
      data: generateData(timestamps, 40),
      color: ChartLineColor.LightGrey,
    },
    {
      label: 'processed',
      data: generateData(timestamps, 120),
      color: '#3F88FF',
    },
    {
      label: 'delivered',
      data: generateData(timestamps, 90),
      color: '#00C853',
    },
    {
      label: 'queued',
      data: generateData(timestamps, 70),
      color: '#913BE6',
    },
    {
      label: 'warnings',
      data: generateData(timestamps, 35),
      color: '#FF8A3D',
    },
    {
      label: 'retries',
      data: generateData(timestamps, 25),
      color: '#2EC4B6',
    },
    {
      label: 'custom',
      data: generateData(timestamps, 55),
      color: '#7CFF6B',
    },
  ];
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

  &__code {
    margin: 0;
    padding: var(--spacing-s);
    background-color: var(--base--bg-primary);
    border-radius: var(--radius-s);
    overflow-x: auto;
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

  &__showcase {
    width: 100%;
    background-color: var(--base--bg-secondary);
    border-radius: var(--radius-m);
  }

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 180px;
  }
}
</style>
