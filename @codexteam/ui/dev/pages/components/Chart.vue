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
        An array of line objects to display on the chart.
      </p>
    </div>

    <div class="chart-props__item">
      <h4 class="chart-props__name">
        detalization
      </h4>
      <p class="chart-props__description">
        Controls how timestamps are formatted on the X-axis legend and tooltip.
        Does not affect data aggregation — only the display format.
      </p>
      <ul class="chart-props__list">
        <li><code>'days'</code> — shows day and month (e.g., "19 dec")</li>
        <li><code>'hours'</code> — shows day, month, and time (e.g., "19 dec, 14:00")</li>
        <li><code>'minutes'</code> — shows day, month, and time (e.g., "19 dec, 14:30")</li>
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
  </div>

  <Heading :level="3">
    Single Line
  </Heading>
  <div class="chart-example">
    <div class="chart-example__showcase">
      <Chart
        :lines="[singleLineData]"
        :detalization="currentDetalization"
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import { Chart, ChartLineColor, Heading, Select } from '../../../src/vue';
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
 * Generate sample chart data
 *
 * @param points - Number of data points to generate
 * @param intervalSeconds - Time interval between points in seconds
 * @param baseValue - Base value for random count generation
 */
function generateData(points: number, intervalSeconds: number, baseValue = 100): ChartItem[] {
  const now = Math.floor(Date.now() / 1000);

  return Array.from({ length: points }, (_, i) => ({
    timestamp: now - (points - i) * intervalSeconds,
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
 * Single line chart data - 30 days of events
 */
const singleLineData = computed<ChartLine>(() => ({
  label: 'events',
  data: generateData(30, 86400, 2000),
  color: ChartLineColor.Red,
}));

/**
 * Multiple lines chart data - accepted and filtered events
 */
const multipleLinesData = computed<ChartLine[]>(() => [
  {
    label: 'accepted',
    data: generateData(30, 86400, 150),
    color: ChartLineColor.Red,
  },
  {
    label: 'filtered',
    data: generateData(30, 86400, 50),
    color: ChartLineColor.LightGrey,
  },
]);
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

.chart-example {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);
  margin-bottom: var(--spacing-xl);
  position: relative;

  &__showcase {
    width: 100%;
    background-color: var(--base--bg-secondary);
    border-radius: var(--radius-m);
  }

}
</style>
