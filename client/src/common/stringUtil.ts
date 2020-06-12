export function shortenString(input: string, maxLength: number, separator = " ") {
  if (input.length <= maxLength) return input;
  return `${input.substr(0, input.lastIndexOf(separator, maxLength))}...`;
}

export function inicials(input: string) {
  return input
    .split(" ")
    .map(word => word.charAt(0))
    .join("");
}
