import type ApiResponse from '@/infrastructure/transport/notes-api/types/ApiResponse';
import AuthorizableTransport from '@/infrastructure/transport/authorizable.transport';
import type JSONValue from '../types/JSONValue';

/**
 * Notes api transport
 */
export default class NotesApiTransport extends AuthorizableTransport {
  /**
   * Constructor for notes api transport
   *
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * Make GET request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   */
  public async get<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    const response = await super.get<ApiResponse<Payload>>(endpoint, data);

    /**
     * If data is not present in response
     */
    if (!('data' in response)) {
      console.log('Notes API Error:', response.message);

      throw new Error(response.status ? response.status.toString() : 'Data was not received due some problems');
    }

    return response.data;
  }

  /**
   * Make POST request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   */
  public async post<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    const response = await super.post<ApiResponse<Payload>>(endpoint, data);

    if ('status' in response) {
      console.log('Notes API Error:', response.message || response.status);

      throw new Error(response.status.toString());
    }

    return response.data;
  }

  /**
   * Make PATCH request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   */
  public async patch<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    const response = await super.patch<ApiResponse<Payload>>(endpoint, data);

    if ('status' in response) {
      console.log('Notes API Error:', response.message || response.status);

      throw new Error(response.status.toString());
    }

    return response.data;
  }

  /**
   * Make DELETE request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   */
  public async delete<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    const response = await super.delete<ApiResponse<Payload>>(endpoint, data);

    if ('status' in response) {
      console.log('Notes API Error:', response.message || response.status);

      throw new Error(response.status.toString());
    }

    return response.data;
  }
}
