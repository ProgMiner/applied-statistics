export function verifyString(n?: string): boolean {
    if (n === undefined) {
        return false;
    }

    return n.trim() === "Орехи" || n.trim() === "Шоколад";
}