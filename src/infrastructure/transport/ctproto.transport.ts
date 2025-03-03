import { CTProtoClient } from 'ctproto';
import { nanoid } from 'nanoid';

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

  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  constructor(apiUrl: string, authToken: string) {
    this.client = new CTProtoClient<AuthRequestPayload, AuthResponsePayload, ApiRequest, ApiResponse, ApiUpdate>({
      apiUrl,
      authRequestPayload: { token: authToken },
      onAuth: (response) => {
        console.log('✅ Аутентификация успешна:', response);
        this.reconnectAttempts = 0; // Сброс счётчика попыток
      },
      onMessage: (message) => {
        console.log('📩 Получено сообщение от сервера:', message);
      },
      onError: (error) => {
        console.error('❌ Ошибка CTProto:', error);
      },
      onDisconnect: (reason) => {
        console.warn('⚠ CTProto отключен:', reason);
      },
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

  /**
   * Подписка на входящие сообщения
   * @param callback - Функция обработки сообщений
   */
  public on(callback: (message: ApiResponse | ApiUpdate) => void): void {
    this.client.onMessage = callback;
  }
}
