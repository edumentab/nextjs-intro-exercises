/**
 * Formats a number of cents into a string of euros.
 *
 * @param cents the amount in cents
 * @returns the amount in formatted euros
 */
export const formatEuros = (cents: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(
    cents / 100
  );
