import type McpTokenRepositoryInterface from '@/domain/mcpToken.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type { CreatedMcpToken, McpToken, McpTokenPermission } from '@/domain/entities/McpToken';

/**
 * MCP tokens repository class used for data delivery from transport to service
 */
export default class McpTokenRepository implements McpTokenRepositoryInterface {
  /**
   * Notes api transport instance
   */
  private readonly transport: NotesApiTransport;

  constructor(notesApiTransport: NotesApiTransport) {
    this.transport = notesApiTransport;
  }

  /**
   * Loads all MCP tokens of the current user
   */
  public async getTokens(): Promise<McpToken[]> {
    const response = await this.transport.get<{ items: McpToken[] }>('/user/mcp-tokens');

    return response.items;
  }

  /**
   * Creates new MCP token
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   */
  public async createToken(label: string, permission: McpTokenPermission): Promise<CreatedMcpToken> {
    return await this.transport.post<CreatedMcpToken>({
      endpoint: '/user/mcp-tokens',
      data: {
        label,
        permission,
      },
    });
  }

  /**
   * Revokes MCP token
   * @param id - token id
   */
  public async revokeToken(id: McpToken['id']): Promise<void> {
    await this.transport.delete<{ isDeleted: boolean }>(`/user/mcp-tokens/${id}`);
  }
}
