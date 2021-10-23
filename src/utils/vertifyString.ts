export function verifyString(n?: string): boolean {
    if (n === undefined) {
        return false;
    }

    return n.trim().toLowerCase() === "орехи" || n.trim().toLowerCase() === "шоколад";
}