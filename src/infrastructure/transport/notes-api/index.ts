import type ApiResponse from '@/infrastructure/transport/notes-api/types/ApiResponse';
import AuthtorizableTransport from '@/infrastructure/transport/authtorizable.transport';

/**
 * Notes api transport
 */
export default class NotesApiTransport extends AuthtorizableTransport {
  /**
   * Constructor for notes api transport
   *
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * Make GET request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   */
  public async get<Payload>(endpoint: string): Promise<Payload | null> {
    const response = await super.get<ApiResponse<Payload>>(endpoint);

    /**
     * If data is not present in response
     */
    if (!('data' in response)) {
      /**
       * TODO: Handle error
       */

      return null;
    }

    return response.data;
  }
}
