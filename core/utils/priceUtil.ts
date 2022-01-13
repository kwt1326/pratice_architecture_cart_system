export function priceComma(num: string) {
  if (typeof num === 'string') {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return num;
}