import type JSONValue from './JSONValue';

type MaybeJSONValueOrBlob<IsBlob extends boolean> = IsBlob extends true ? Blob : JSONValue;

export default MaybeJSONValueOrBlob;
