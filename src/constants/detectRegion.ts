export function detectRegion(): "EU" | "CH" | "INT" {
  try {
    const locale = navigator.language || "en-US";

    if (locale.startsWith("de-CH")) return "CH";   // Schweiz
    if (locale.startsWith("de") || locale.startsWith("fr") || locale.startsWith("it"))
      return "EU";                                 // EU-Sprache → EU Preis

    return "INT";                                  // Rest der Welt
  } catch {
    return "EU";                                   // Fallback
  }
}
