
export function verifyNumber(n?: string): boolean {
    if (n === undefined) {
        return false;
    }

    return !!n && !isNaN(+n);
}
