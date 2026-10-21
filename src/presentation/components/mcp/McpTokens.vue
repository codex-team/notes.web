<template>
  <Fieldset :title="t('userSettings.mcp.title')">
    <div :class="$style['mcp']">
      <div :class="$style['mcp__new-token']">
        <Section
          :title="t('userSettings.mcp.newToken.title')"
          :caption="t('userSettings.mcp.newToken.caption')"
        >
          <div :class="$style['mcp__form']">
            <Input
              v-model="label"
              :placeholder="t('userSettings.mcp.newToken.labelPlaceholder')"
            />
            <Row
              :title="t('userSettings.mcp.newToken.allowEditing')"
              :subtitle="t('userSettings.mcp.newToken.allowEditingCaption')"
            >
              <template #right>
                <Switch v-model="canEdit" />
              </template>
            </Row>
          </div>
        </Section>
        <div>
          <Button
            :disabled="label.trim() === '' || isCreating || isLoading"
            @click="createClicked"
          >
            {{ t('userSettings.mcp.newToken.create') }}
          </Button>
        </div>
      </div>

      <Section
        v-if="createdToken !== null"
        :title="t('userSettings.mcp.createdToken.title')"
        :caption="t('userSettings.mcp.createdToken.caption')"
      >
        <div :class="$style['mcp__created']">
          <Row :title="createdToken">
            <template #right>
              <Button
                icon="Copy"
                @click="copy(createdToken)"
              >
                {{ t('userSettings.mcp.copy') }}
              </Button>
            </template>
          </Row>
          <div
            v-for="instruction in setupInstructions"
            :key="instruction.title"
            :class="$style['mcp__instruction']"
          >
            <Row
              :title="instruction.title"
              :subtitle="instruction.caption"
            >
              <template #right>
                <Button
                  icon="Copy"
                  secondary
                  @click="copy(instruction.snippet)"
                >
                  {{ t('userSettings.mcp.copy') }}
                </Button>
              </template>
            </Row>
            <pre :class="[$style['mcp__snippet'], 'text-monospaced']">{{ instruction.snippet }}</pre>
          </div>
        </div>
      </Section>

      <Section
        v-if="hasLoadError"
        :title="t('userSettings.mcp.tokens.title')"
      >
        <Row :title="t('userSettings.mcp.tokens.loadError')">
          <template #right>
            <Button
              secondary
              :disabled="isLoading"
              @click="loadTokens"
            >
              {{ t('userSettings.mcp.tokens.retry') }}
            </Button>
          </template>
        </Row>
      </Section>

      <Section
        v-else-if="tokens.length > 0"
        :title="t('userSettings.mcp.tokens.title')"
        :caption="t('userSettings.mcp.tokens.caption')"
      >
        <Row
          v-for="(token, tokenIndex) in tokens"
          :key="token.id"
          :title="token.label"
          :subtitle="describeToken(token)"
          :has-delimiter="tokenIndex !== tokens.length - 1"
        >
          <template #right>
            <Button
              secondary
              @click="revokeClicked(token)"
            >
              {{ t('userSettings.mcp.tokens.revoke') }}
            </Button>
          </template>
        </Row>
      </Section>
    </div>
  </Fieldset>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '@vueuse/core';
import { Button, Fieldset, Input, Row, Section, Switch, useConfirm } from '@codexteam/ui/vue';
import useUserMcpSettings from '@/application/services/useUserMcpSettings';
import type { McpToken } from '@/domain/entities/McpToken';
import { getTimeFromNow } from '@/infrastructure/utils/date';

const { t } = useI18n();
const { copy } = useClipboard();
const { confirm } = useConfirm();
const { tokens, isLoading, hasLoadError, loadTokens, createToken, revokeToken } = useUserMcpSettings();

/**
 * Label of the new token
 */
const label = ref('');

/**
 * Whether the new token allows editing notes
 */
const canEdit = ref(false);

/**
 * Whether the token is being created
 */
const isCreating = ref(false);

/**
 * Plain token shown once after creation
 */
const createdToken = ref<string | null>(null);

/**
 * MCP endpoint url
 */
const mcpUrl = `${import.meta.env.VITE_API_URL}/mcp`;

/**
 * Ready-made setup instructions for popular MCP clients
 */
const setupInstructions = computed(() => {
  const token = createdToken.value ?? '';

  return [
    {
      title: 'Claude Code',
      caption: t('userSettings.mcp.instructions.claudeCode'),
      snippet: `claude mcp add --transport http notex ${mcpUrl} --header "Authorization: Bearer ${token}"`,
    },
    {
      title: 'Cursor',
      caption: t('userSettings.mcp.instructions.cursor'),
      snippet: JSON.stringify({
        mcpServers: {
          notex: {
            url: mcpUrl,
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Authorization: `Bearer ${token}`,
            },
          },
        },
      }, null, 2),
    },
    {
      title: 'Claude',
      caption: t('userSettings.mcp.instructions.claude'),
      snippet: `${mcpUrl}\nAuthorization: Bearer ${token}`,
    },
  ];
});

/**
 * Composes short description of the token for the list
 *
 * @param token - MCP token
 * @returns {string} preview, permission, last usage and request count joined in one line
 */
function describeToken(token: McpToken): string {
  const permission = t(`userSettings.mcp.permission.${token.permission}`);
  const lastUsed = token.lastUsedAt !== null
    ? t('userSettings.mcp.tokens.lastUsed', { time: getTimeFromNow(token.lastUsedAt) })
    : t('userSettings.mcp.tokens.neverUsed');
  const requests = t('userSettings.mcp.tokens.requests', token.requestCount);

  return [`ntx_…${token.preview}`, permission, lastUsed, requests].join(' · ');
}

/**
 * Creates token and shows it with setup instructions
 */
async function createClicked(): Promise<void> {
  isCreating.value = true;

  try {
    createdToken.value = await createToken(label.value.trim(), canEdit.value ? 'write' : 'read');
    label.value = '';
  } finally {
    isCreating.value = false;
  }
}

/**
 * Asks for confirmation and revokes the token
 *
 * @param token - token to revoke
 */
async function revokeClicked(token: McpToken): Promise<void> {
  const isConfirmed = await confirm(
    t('userSettings.mcp.tokens.revokeConfirmationTitle'),
    t('userSettings.mcp.tokens.revokeConfirmation', { label: token.label })
  );

  if (isConfirmed) {
    await revokeToken(token.id);
  }
}
</script>

<style lang="postcss" module>
.mcp {
  display: grid;
  gap: var(--spacing-xxl);

  &__new-token {
    display: grid;
    gap: var(--v-padding);
  }

  &__form,
  &__created {
    display: grid;
    gap: var(--v-padding);
  }

  &__instruction {
    display: grid;
  }

  &__snippet {
    margin: 0 var(--h-padding) var(--v-padding);
    padding: var(--v-padding) var(--h-padding);
    overflow-x: auto;
    border-radius: var(--radius-field);
    background-color: var(--base--bg-primary);
    white-space: pre;
  }
}
</style>
