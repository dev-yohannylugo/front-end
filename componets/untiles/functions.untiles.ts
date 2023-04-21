interface ILocation {
  lat: number;
  long: number;
}
export const getLoaction = (coordenadasString: string): ILocation => {
  const [latitudStr, longitudStr] = coordenadasString.split("/");
  const latitud = parseFloat(latitudStr);
  const longitud = parseFloat(longitudStr);
  return { lat: latitud, long: longitud };
};

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }

  let truncatedStr = str.substring(0, maxLength - 3) + "...";

  if (truncatedStr.length < 30) {
    const spacesToAdd = 30 - truncatedStr.length;
    const spaces = "&nbsp;".repeat(spacesToAdd);
    truncatedStr = truncatedStr.substring(0, maxLength - spacesToAdd) + spaces + "...";
  }

  return truncatedStr;
};
