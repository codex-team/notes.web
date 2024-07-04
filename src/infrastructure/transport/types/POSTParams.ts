import type { AuthorizableRequestParams } from '../authorizable.transport';
import type { FilesDto } from './FileDto';
import type JSONValue from './JSONValue';

export interface POSTParams {
  endpoint: string;
  payload?: Record<string, JSONValue | undefined>;
  files?: FilesDto;
}

export interface POSTParamsAuthorizable extends POSTParams {
  params?: AuthorizableRequestParams;
}
