export const shortString = (str: string) => {
  if (str.length > 50) {
    return str.substring(0, 50) + ' . . .'
  } else {
    return str
  }
}
