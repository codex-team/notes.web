import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import type { McpToken, McpTokenPermission } from '@/domain/entities/McpToken';
import { mcpTokenService } from '@/domain';

interface UseMcpTokensComposableState {
  /**
   * MCP tokens of the current user, newest first
   */
  tokens: Ref<McpToken[]>;

  /**
   * Whether tokens are being loaded. Tokens should not be created meanwhile:
   * the loaded list would replace the created token
   */
  isLoading: Ref<boolean>;

  /**
   * Whether tokens failed to load
   */
  hasLoadError: Ref<boolean>;

  /**
   * Loads MCP tokens of the current user
   */
  loadTokens(): Promise<void>;

  /**
   * Creates new MCP token and adds it to the list
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   * @returns plain token, it is not available later
   */
  createToken(label: string, permission: McpTokenPermission): Promise<string>;

  /**
   * Revokes MCP token and removes it from the list
   * @param id - token id
   */
  revokeToken(id: McpToken['id']): Promise<void>;
}

/**
 * Methods for managing MCP tokens of the current user
 */
export default function useMcpTokens(): UseMcpTokensComposableState {
  /**
   * MCP tokens of the current user
   */
  const tokens = ref<McpToken[]>([]);

  /**
   * Whether tokens are being loaded
   */
  const isLoading = ref(true);

  /**
   * Whether tokens failed to load
   */
  const hasLoadError = ref(false);

  /**
   * Loads MCP tokens of the current user
   */
  async function loadTokens(): Promise<void> {
    isLoading.value = true;
    hasLoadError.value = false;

    try {
      tokens.value = await mcpTokenService.getTokens();
    } catch {
      hasLoadError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Creates new MCP token and adds it to the list
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   */
  async function createToken(label: string, permission: McpTokenPermission): Promise<string> {
    const { token, item } = await mcpTokenService.createToken(label, permission);

    tokens.value = [item, ...tokens.value];

    return token;
  }

  /**
   * Revokes MCP token and removes it from the list
   * @param id - token id
   */
  async function revokeToken(id: McpToken['id']): Promise<void> {
    await mcpTokenService.revokeToken(id);

    tokens.value = tokens.value.filter(token => token.id !== id);
  }

  onMounted(async () => {
    await loadTokens();
  });

  return {
    tokens,
    isLoading,
    hasLoadError,
    loadTokens,
    createToken,
    revokeToken,
  };
}
