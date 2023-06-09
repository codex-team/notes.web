/**
 * Api successfully response type
 *
 * @template Payload - Response payload type
 */
interface ApiSuccessfulResponse<Payload> {
  /**
   * Response payload
   */
  data: Payload;
}

/**
 * Api error response type
 */
interface ApiErrorResponse {
  /**
   * Error message
   */
  message: string;

  /**
   * Status code
   */
  status: number;
}

/**
 * Api response type
 */
type ApiResponse<Payload> = ApiSuccessfulResponse<Payload> | ApiErrorResponse;

export default ApiResponse;
