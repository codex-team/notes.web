<template>
  <PageHeader>
    Button
    <template #description>
      Clickable component for action or navigation
    </template>
  </PageHeader>

  <Heading :level="3">
    By icon type
  </Heading>

  <div class="buttons">
    Default
    <div class="buttons__showcase">
      <Button>
        Button
      </Button>
    </div>

    With leading icon
    <div class="buttons__showcase">
      <Button icon="Plus">
        Button
      </Button>
    </div>

    With trailing iocn
    <div class="buttons__showcase">
      <Button trailing-icon="Loader">
        Button
      </Button>
    </div>

    With leading and trailing icon
    <div class="buttons__showcase">
      <Button
        icon="Plus"
        trailing-icon="Loader"
      >
        Button
      </Button>
    </div>

    With a standalone icon
    <div class="buttons__showcase">
      <Button
        icon="Plus"
      />
    </div>
  </div>

  <Heading :level="3">
    By style
  </Heading>

  <div class="buttons">
    Primary
    <div class="buttons__showcase">
      <Button>
        Button
      </Button>
    </div>

    Secondary
    <div class="buttons__showcase">
      <Button secondary>
        Button
      </Button>
    </div>

    Destructive
    <div class="buttons__showcase">
      <Button destructive>
        Button
      </Button>
    </div>

    Disabled
    <div class="buttons__showcase">
      <Button disabled>
        Button
      </Button>
    </div>
  </div>
  <Button icon="Plus" />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button, Heading } from '../../../src/vue';

</script>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: var(--spacing-l);
  align-items: center;
}
</style>
