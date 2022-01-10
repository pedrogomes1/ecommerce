export function currencyFormatter(
  value: number,
  locale = 'pt-BR',
  currency = 'BRL',
) {
  const price = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

  return price;
}
