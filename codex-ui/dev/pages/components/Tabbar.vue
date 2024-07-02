<template>
  <PageHeader>
    Tabbar
    <template #description>
      A list of tabs for switching between different content or pages
    </template>
  </PageHeader>

  <Heading :level="2">
    Tab
  </Heading>

  <Tab
    id="/"
    title="Home"
  />
  <br>
  <Tab
    id="/"
    title="Home"
    picture="../static/example-avatar.png"
  />
  <br>
  <Tab
    id="/"
    title="Home"
    icon="Plus"
  />
  <br>
  <Tab
    id="/"
    title="Home"
    :closable="true"
  />
  <br>
  <Tab
    id="/"
    title="Home"
    :closable="true"
    :is-active="true"
  />

  <Heading :level="2">
    Tabbar
  </Heading>
  <Heading :level="3">
    Tabbar default
  </Heading>
  <Tabbar
    :tabs="defaultTabs"
  />
  <Heading :level="3">
    Tabbar without crosses
  </Heading>
  <Tabbar
    :tabs="tabsWithoutCrossState"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Tabbar, Tab, TabParams, Heading } from '../../../src/vue';

/**
 * Tabs for example usage of tabbar
 */
const defaultTabs = [
  {
    title: 'Home',
    id: '/',
    picture: '../static/example-avatar.png',
  },
  {
    title: 'New note',
    id: '/new',
    closable: true,
  },
  {
    title: 'User settings',
    id: '/settings',
    closable: true,
    isActive: true,
  },
];

const tabsWithoutCrossState: TabParams[] = [
  {
    title: 'Home',
    id: '/',
  },
  {
    title: 'New note',
    id: '/',
    closable: true,
  },
  {
    title: 'User settings',
    id: '/',
    closable: true,
    isActive: true,
  },
];

for (let _ = 0; _ < 15; ++_) {
  tabsWithoutCrossState.push({
    title: 'Marketplace',
    id: '/marketplace',
    closable: true,
    icon: 'Plus',
  });
}

</script>

<style scoped>
</style>
