const factorialBuffer: number[] = [1, 1, 2];

export function factorial(n: number): number {
    if (factorialBuffer[n]) {
        return factorialBuffer[n];
    }

    if (n < 1) {
        return 0;
    }

    n = Math.floor(n);
    return factorialBuffer[n] = factorial(n - 1) * n;
}
