<template>
  <PageHeader>
    Chart
    <template #description>
      A component for displaying line charts with smooth curves and interactive tooltips.
    </template>
  </PageHeader>

  <Heading :level="3">
    Single Line Chart
  </Heading>

  <div class="charts">
    <div class="charts__showcase">
      <Chart
        :lines="[singleLine]"
        detalization="days"
      />
    </div>
  </div>

  <Heading :level="3">
    Multiple Lines Chart
  </Heading>

  <div class="charts">
    <div class="charts__showcase">
      <Chart
        :lines="multipleLines"
        detalization="days"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Chart, ChartLineColor, Heading } from '../../../src/vue';
import type { ChartItem, ChartLine } from '../../../src/vue/components/chart';

/**
 * Generate sample data for a given number of days
 *
 * @param days Number of days to generate data for.
 * @param baseValue Base value used to scale the random counts (default: 100).
 */
function generateData(days: number, baseValue: number = 100): ChartItem[] {
  const now = Math.floor(Date.now() / 1000);
  const dayInSeconds = 86400;

  return Array.from({ length: days }, (_, i) => ({
    timestamp: now - (days - i) * dayInSeconds,
    count: Math.floor(Math.random() * baseValue) + Math.floor(baseValue / 2),
  }));
}

/**
 * Single line chart data
 */
const singleLine: ChartLine = {
  label: 'events',
  data: generateData(30, 200),
  color: ChartLineColor.Red,
};

/**
 * Multiple lines chart data
 */
const multipleLines: ChartLine[] = [
  {
    label: 'accepted',
    data: generateData(30, 150),
    color: ChartLineColor.Red,
  },
  {
    label: 'rate-limited',
    data: generateData(30, 50),
    color: ChartLineColor.LightGrey,
  },
];
</script>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);
  margin-bottom: var(--spacing-xl);
  &__showcase {
    width: 100%;
    height: 200px;
    background-color: var(--base--bg-secondary);
    border-radius: var(--radius-m);
    padding: var(--spacing-m);
  }
}
</style>
