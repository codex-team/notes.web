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
      <div class="charts__controls">
        <Select
          v-model="singleRangeSelected"
          :align="{ vertically: 'below', horizontally: 'left' }"
          :is-disabled="false"
          :items="singleRangeItems"
        />
        <Select
          :key="singleChartRange"
          v-model="singleGroupingSelected"
          :align="{ vertically: 'below', horizontally: 'left' }"
          :is-disabled="false"
          :items="singleGroupingItems"
        />
      </div>
      <Chart
        :lines="[singleLineData]"
        :detalization="singleChartGrouping"
      />
    </div>
  </div>

  <Heading :level="3">
    Multiple Lines Chart
  </Heading>

  <div class="charts">
    <div class="charts__showcase">
      <div class="charts__controls">
        <Select
          v-model="multiRangeSelected"
          :align="{ vertically: 'below', horizontally: 'left' }"
          :is-disabled="false"
          :items="multiRangeItems"
        />
        <Select
          :key="multiChartRange"
          v-model="multiGroupingSelected"
          :align="{ vertically: 'below', horizontally: 'left' }"
          :is-disabled="false"
          :items="multiGroupingItems"
        />
      </div>
      <Chart
        :lines="multipleLinesData"
        :detalization="multiChartGrouping"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Chart, ChartLineColor, Heading, Select } from '../../../src/vue';
import type { ChartItem, ChartLine } from '../../../src/vue/components/chart';
import type { ContextMenuItem, DefaultItem } from '../../../src/vue/components/context-menu/ContextMenu.types';
import { ref, computed, watch } from 'vue';

/**
 * Range types for chart data
 */
type RangeValue = 'hour' | 'day' | 'week' | 'month';

/**
 * Grouping types for chart detalization.
 * Affects the legend and tooltip display format:
 * - 'minutes' → shows day, month, hours:minutes (e.g., "18 dec, 14:30")
 * - 'hours' → shows day, month, hours:minutes (e.g., "18 dec, 14:00")
 * - 'days' → shows only day and month (e.g., "18 dec")
 */
type GroupingValue = 'minutes' | 'hours' | 'days';

/**
 * Mapping from title to range value
 */
const rangeTitleToValue: Record<string, RangeValue> = {
  Hour: 'hour',
  Day: 'day',
  Week: 'week',
  Month: 'month',
};

/**
 * Mapping from title to grouping value
 */
const groupingTitleToValue: Record<string, GroupingValue> = {
  Minutes: 'minutes',
  Hours: 'hours',
  Days: 'days',
};

/**
 * Generate sample data based on range and grouping
 *
 * @param range - The time range ('hour', 'day', 'week', 'month')
 * @param grouping - The grouping level ('minutes', 'hours', 'days')
 * @param baseValue - Base value used to scale the random counts
 */
function generateData(range: RangeValue, grouping: GroupingValue, baseValue: number = 100): ChartItem[] {
  const now = Math.floor(Date.now() / 1000);
  let points: number;
  let intervalSeconds: number;

  /* Determine number of points and interval based on range and grouping */
  switch (range) {
    case 'hour':
      /* 1 hour = 60 minutes */
      points = 60;
      intervalSeconds = 60; /* 1 minute */
      break;
    case 'day':
      if (grouping === 'minutes') {
        points = 24 * 60; /* 1440 minutes */
        intervalSeconds = 60;
      } else {
        points = 24; /* 24 hours */
        intervalSeconds = 3600;
      }
      break;
    case 'week':
      if (grouping === 'hours') {
        points = 7 * 24; /* 168 hours */
        intervalSeconds = 3600;
      } else {
        points = 7; /* 7 days */
        intervalSeconds = 86400;
      }
      break;
    case 'month':
    default:
      points = 30; /* 30 days */
      intervalSeconds = 86400;
      break;
  }

  return Array.from({ length: points }, (_, i) => ({
    timestamp: now - (points - i) * intervalSeconds,
    count: Math.floor(Math.random() * baseValue) + Math.floor(baseValue / 2),
  }));
}

/**
 * Check if grouping is available for a given range
 *
 * @param range - The time range value
 * @param grouping - The grouping value to check
 */
function isGroupingAvailable(range: RangeValue, grouping: GroupingValue): boolean {
  switch (range) {
    case 'hour':
      /* hour → only minutes */
      return grouping === 'minutes';
    case 'day':
      /* day → hours or minutes */
      return grouping === 'hours' || grouping === 'minutes';
    case 'week':
      /* week → days or hours */
      return grouping === 'days' || grouping === 'hours';
    case 'month':
      /* month → only days */
      return grouping === 'days';
    default:
      return true;
  }
}

/**
 * Get default grouping title for a given range
 *
 * @param range - The time range value
 */
function getDefaultGroupingTitle(range: RangeValue): string {
  switch (range) {
    case 'hour':
      return 'Minutes';
    case 'day':
      return 'Hours';
    case 'week':
      return 'Days';
    case 'month':
      return 'Days';
    default:
      return 'Days';
  }
}

/**
 * Create a  function for onActivate Option Select that is called when click
 */
const onActivateOptionSelect = (): void => {};

/* ==================== Single Line Chart ==================== */

/**
 * Currently selected range option for single line chart
 */
const singleRangeSelected = ref<DefaultItem>({
  title: 'Day',
  onActivate: onActivateOptionSelect,
});

/**
 * Currently selected grouping option for single line chart
 */
const singleGroupingSelected = ref<DefaultItem>({
  title: 'Hours',
  onActivate: onActivateOptionSelect,
});

/**
 * Available range options for single line chart
 */
const singleRangeItems: ContextMenuItem[] = [
  {
    title: 'Hour',
    onActivate: onActivateOptionSelect,
  },
  {
    title: 'Day',
    onActivate: onActivateOptionSelect,
  },
  {
    title: 'Week',
    onActivate: onActivateOptionSelect,
  },
  {
    title: 'Month',
    onActivate: onActivateOptionSelect,
  },
];

/**
 * Computed range value derived from selected range title
 */
const singleChartRange = computed<RangeValue>(() => {
  return rangeTitleToValue[singleRangeSelected.value.title] || 'day';
});

/**
 * Computed grouping value derived from selected grouping title
 */
const singleChartGrouping = computed<GroupingValue>(() => {
  return groupingTitleToValue[singleGroupingSelected.value.title] || 'hours';
});

/**
 * Available grouping options filtered by current range
 * - month → only Days
 * - week → Days, Hours
 * - day → Hours, Minutes
 * - hour → only Minutes
 */
const singleGroupingItems = computed<ContextMenuItem[]>(() => {
  const range = singleChartRange.value;

  return [
    {
      title: 'Minutes',
      onActivate: onActivateOptionSelect,
    },
    {
      title: 'Hours',
      onActivate: onActivateOptionSelect,
    },
    {
      title: 'Days',
      onActivate: onActivateOptionSelect,
    },
  ].filter(item => isGroupingAvailable(range, groupingTitleToValue[item.title]));
});

/**
 * Chart data for single line chart
 */
const singleLineData = computed<ChartLine>(() => ({
  label: 'events',
  data: generateData(singleChartRange.value, singleChartGrouping.value, 2000),
  color: ChartLineColor.Red,
}));

/**
 * Auto-set grouping to default when range changes and current grouping is not available
 */
watch(singleChartRange, (newRange) => {
  const currentGrouping = singleChartGrouping.value;

  if (!isGroupingAvailable(newRange, currentGrouping)) {
    singleGroupingSelected.value = {
      title: getDefaultGroupingTitle(newRange),
      onActivate: onActivateOptionSelect,
    };
  }
});

/* ==================== Multiple Lines Chart ==================== */

/**
 * Currently selected range option for multiple lines chart
 */
const multiRangeSelected = ref<DefaultItem>({
  title: 'Week',
  onActivate: onActivateOptionSelect,
});

/**
 * Currently selected grouping option for multiple lines chart
 */
const multiGroupingSelected = ref<DefaultItem>({
  title: 'Days',
  onActivate: onActivateOptionSelect,
});

/**
 * Available range options for multiple lines chart
 */
const multiRangeItems: ContextMenuItem[] = [
  {
    title: 'Hour',
    onActivate: onActivateOptionSelect,
  },
  {
    title: 'Day',
    onActivate: onActivateOptionSelect,
  },
  {
    title: 'Week',
    onActivate: onActivateOptionSelect,
  },
  {
    title: 'Month',
    onActivate: onActivateOptionSelect,
  },
];

/**
 * Computed range value derived from selected range title
 */
const multiChartRange = computed<RangeValue>(() => {
  return rangeTitleToValue[multiRangeSelected.value.title] || 'week';
});

/**
 * Computed grouping value derived from selected grouping title
 */
const multiChartGrouping = computed<GroupingValue>(() => {
  return groupingTitleToValue[multiGroupingSelected.value.title] || 'days';
});

/**
 * Available grouping options filtered by current range
 * - month → only Days
 * - week → Days, Hours
 * - day → Hours, Minutes
 * - hour → only Minutes
 */
const multiGroupingItems = computed<ContextMenuItem[]>(() => {
  const range = multiChartRange.value;

  return [
    {
      title: 'Minutes',
      onActivate: onActivateOptionSelect,
    },
    {
      title: 'Hours',
      onActivate: onActivateOptionSelect,
    },
    {
      title: 'Days',
      onActivate: onActivateOptionSelect,
    },
  ].filter(item => isGroupingAvailable(range, groupingTitleToValue[item.title]));
});

/**
 * Chart data for multiple lines chart with two lines: accepted and rate-limited
 */
const multipleLinesData = computed<ChartLine[]>(() => [
  {
    label: 'accepted',
    data: generateData(multiChartRange.value, multiChartGrouping.value, 150),
    color: ChartLineColor.Red,
  },
  {
    label: 'rate-limited',
    data: generateData(multiChartRange.value, multiChartGrouping.value, 50),
    color: ChartLineColor.LightGrey,
  },
]);

/**
 * Auto-set grouping to default when range changes and current grouping is not available
 */
watch(multiChartRange, (newRange) => {
  const currentGrouping = multiChartGrouping.value;

  if (!isGroupingAvailable(newRange, currentGrouping)) {
    multiGroupingSelected.value = {
      title: getDefaultGroupingTitle(newRange),
      onActivate: onActivateOptionSelect,
    };
  }
});
</script>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);
  margin-bottom: var(--spacing-xl);

  &__showcase {
    position: relative;
    width: 100%;
    height: 250px;
    background-color: var(--base--bg-secondary);
    border-radius: var(--radius-m);
    padding: var(--spacing-m);
  }

  &__controls {
    position: absolute;
    top: var(--spacing-m);
    right: var(--spacing-m);
    z-index: 2;
    display: flex;
    gap: var(--spacing-m);
  }

  &__control-group {
    display: flex;
    gap: var(--spacing-s);
  }
}
</style>
