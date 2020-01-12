
export const leftExprRegexp = /^(\s*-?\d+\s*<=?)?\s*$/;
export const rightExprRegexp = /^\s*[<>]=?\s*-?\d+\s*$/;

export function parseExpression(
    leftExpr: string,
    rightExpr: string,
    k1: number,
    k2: number
): { k1: number, k2: number } {
    const ret = { k1, k2 };

    if (!leftExpr) {
        if (rightExpr[0] === '>') {
            ret.k1 = rightExpr.includes('=')
                ? +rightExpr.substring(2)
                : +rightExpr.substring(1) + 1;
        } else {
            ret.k2 = rightExpr.includes('=')
                ? +rightExpr.substring(2) + 1
                : +rightExpr.substring(1);
        }
    } else {
        ret.k1 = leftExpr.includes('=')
            ? +leftExpr.substring(0, leftExpr.length - 2)
            : +leftExpr.substring(0, leftExpr.length - 1) + 1;

        ret.k2 = rightExpr.includes('=')
            ? +rightExpr.substring(2) + 1
            : +rightExpr.substring(1);
    }

    return ret;
}
