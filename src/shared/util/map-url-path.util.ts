export const mapUrlMedia = (file: any, url: string = process.env.URL_MEDIA) => {
  if (file.type == '.xlsx' || file.type == '.xls' || file.type == '.pdf') {
    file.filePath = `${url}/${process.env.MINIO_BUCKET}/${file.directoryName}/${file.filePath}`;
  } else if (file.type != 'url') {
    file.filePath = `${url}/${process.env.MINIO_BUCKET}/${file.directoryName}/${file.filePath}`;
  }
  return file;
};
