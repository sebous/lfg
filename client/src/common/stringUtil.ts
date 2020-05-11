export function shortenString(input: string, maxLength: number, separator = " ") {
  if (input.length <= maxLength) return input;
  return `${input.substr(0, input.lastIndexOf(separator, maxLength))}...`;
}
