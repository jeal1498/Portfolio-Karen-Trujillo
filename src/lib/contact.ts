export const WA_NUMBER = '529983211547';
export const PHONE_NUMBER = '529983211547';

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
