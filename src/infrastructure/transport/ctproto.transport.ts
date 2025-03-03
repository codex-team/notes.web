import { CTProtoClient } from 'ctproto';

interface AuthRequestPayload {
  token: string;
}

interface AuthResponsePayload {
  userId: string;
  username: string;
}

interface ApiRequest {
  messageId: string;
  type: string;
  payload: any;
}

interface ApiResponse {
  messageId: string;
  type: string;
  payload: any;
}

interface ApiUpdate {
  messageId: string;
  type: string;
  payload: any;
}

export default class CtprotoTransport {
  private client: CTProtoClient<
    AuthRequestPayload,
    AuthResponsePayload,
    ApiRequest,
    ApiResponse,
    ApiUpdate
  >;

  constructor(apiUrl: string, authToken: string) {
    this.client = new CTProtoClient<AuthRequestPayload, AuthResponsePayload, ApiRequest, ApiResponse, ApiUpdate>({
      apiUrl,
      authRequestPayload: { token: authToken },
      onAuth: (response) => {
        console.log('✅ Аутентификация успешна:', response);
      },
      onMessage: (message) => {
        console.log('📩 Получено сообщение от сервера:', message);
      },
      disableLogs: false,
    });
  }

  /**
   * Отправка сообщения на сервер
   * @param type - Тип сообщения
   * @param payload - Данные
   */
  public async send(type: string, payload: any): Promise<ApiResponse> {
    return this.client.send(
      type,
      payload
    );
  }
}
