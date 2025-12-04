export function detectRegion(): "EU" | "CH" | "INT" {
  const country = Intl.DateTimeFormat().resolvedOptions().locale;

  if (country.includes("CH")) return "CH";
  if (country.includes("DE") || country.includes("AT") || country.includes("ES") || country.includes("FR") || country.includes("IT")) {
    return "EU";
  }

  return "INT"; // USA, UK, Kanada, Weltweit
}
