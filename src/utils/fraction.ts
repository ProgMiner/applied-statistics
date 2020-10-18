import { gcd } from './gcd';

export function fraction(numerator: number, denominator: number): string {
    const _gcd = gcd(numerator, denominator);

    if (_gcd === denominator) {
        return '' + (numerator / _gcd);
    }

    return `${numerator / _gcd} / ${denominator / _gcd}`;
}
