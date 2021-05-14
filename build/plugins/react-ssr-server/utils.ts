export const isJS = (file: string) => {
  return /\.js(\?[^.]+)?$/.test(file)
}
