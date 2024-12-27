export class FileEntity extends File {
  originalname: string;
  fileBits: BlobPart[];
  options: FilePropertyBag | undefined;

  constructor(
    public id: string,
    public bucketName: string,
    public userId: number,
    fileBits: BlobPart[] = [],
    fileName: string = '',
    options?: FilePropertyBag,
  ) {
    super(fileBits, fileName, options);
    this.originalname = fileName;
    this.fileBits = fileBits;
    this.options = options;
  }
}