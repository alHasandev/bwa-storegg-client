/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */

type DataURL = string | ArrayBuffer;

export default function readAsDataURL(
  files: FileList | null,
  onloadCallback?: (dataURL: DataURL) => void
) {
  return new Promise<DataURL>((resolve, reject) => {
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (onloadCallback instanceof Function) {
          return onloadCallback(e.target?.result || '');
        }
        return resolve(e.target?.result || '');
      };

      reader.readAsDataURL(files[0]);
    } else {
      reject(new Error('Input Files is undefined'));
    }
  });
}
