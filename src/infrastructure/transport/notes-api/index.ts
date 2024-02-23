/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { ApiErrorResponse } from '@/infrastructure/transport/notes-api/types/ApiResponse';
import type { AuthorizableRequestParams } from '@/infrastructure/transport/authorizable.transport';
import AuthorizableTransport from '@/infrastructure/transport/authorizable.transport';
import type JSONValue from '../types/JSONValue';
import UnauthorizedError from '@/domain/entities/errors/Unauthorized';
import NotFoundError from '@/domain/entities/errors/NotFound';

/**
 * Additional params that could be specified for request to NoteX API
 */
interface NotexApiRequestParams extends AuthorizableRequestParams {}

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
    super(baseUrl, {
      /**
       * Method for creating an Error based on Notes API response
       *
       * @param status - HTTP status
       * @param payload - Response JSON payload
       */
      errorFormatter(status, payload) {
        const { message, code } = payload as ApiErrorResponse;

        let errorText = '';

        /**
         * If 'code' is provided, use it as an error text so we can show it to the user using corresponded i18n message
         */
        if (code !== undefined) {
          errorText = code.toString();
        } else if (message !== undefined) {
          errorText = message;
        } else {
          errorText = 'Unknown error';
        }

        /**
         * Create error based on response status
         */
        switch (status) {
          case 401:
          case 403:
            return new UnauthorizedError(errorText);
          case 404:
            return new NotFoundError(errorText);
          default:
            return new Error(errorText);
        }
      },
    });
  }

  /**
   * Make GET request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   * @param params - Additional params to tune request
   */
  public async get<Payload>(endpoint: string, data?: JSONValue, params?: NotexApiRequestParams): Promise<Payload> {
    const response = await super.get(endpoint, data, params);

    return response as Payload;
  }

  /**
   * Make POST request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   * @param params - Additional params to tune request
   */
  public async post<Payload>(endpoint: string, data?: JSONValue, params?: NotexApiRequestParams): Promise<Payload> {
    const response = await super.post(endpoint, data, params);

    return response as Payload;
  }

  /**
   * Make DELETE request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   * @param params - Additional params to tune request
   */
  public async delete<Payload>(endpoint: string, data?: JSONValue, params?: NotexApiRequestParams): Promise<Payload> {
    const response = await super.delete(endpoint, data, params);

    return response as Payload;
  }

  /**
   * Make PATCH request to the NoteX API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   * @param params - Additional params to tune request
   */
  public async patch<Payload>(endpoint: string, data?: JSONValue, params?: NotexApiRequestParams): Promise<Payload> {
    const response = await super.patch(endpoint, data, params);

    return response as Payload;
  }
}
