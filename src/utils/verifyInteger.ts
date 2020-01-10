
export function verifyInteger(n?: string): boolean {
    if (n === undefined) {
        return false;
    }

    const num = +n;
    return !!n && !isNaN(num) && Number.isInteger(num);
}
