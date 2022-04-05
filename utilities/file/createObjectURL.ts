export default function createObjectURL(files: FileList | null) {
  return files ? URL.createObjectURL(files[0]) : '';
}
