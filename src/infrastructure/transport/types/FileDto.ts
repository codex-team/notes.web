type FileDto = {
  key: string;
  blob: Blob;
  fileName: string;
} | {
  key: string;
  file: File;
};

export type FilesDto = FileDto[];
