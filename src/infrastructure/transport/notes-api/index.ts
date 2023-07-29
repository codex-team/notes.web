import Transport from '@/infrastructure/transport';
import type ApiResponse from '@/infrastructure/transport/notes-api/types/ApiResponse';
import type JSONValue from '@/infrastructure/transport/notes-api/types/JSONValue';

/**
 * Notes api transport
 */
export default class NotesApiTransport extends Transport {
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

  /**
   * Make POST request
   *
   * @template Payload - response payload type
   * @param endpoint - API endpoint
   * @param payload - request JSON payload body
   */
  public async post<Payload>(endpoint: string, payload: JSONValue): Promise<Payload | null> {
    const response = await super.post<ApiResponse<Payload>>(endpoint, payload);

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
