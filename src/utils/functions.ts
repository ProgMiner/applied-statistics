export function functions(fun: string, num: string): string {
    switch (fun) {
        case("(2^x-1)"): return '(2^' + num + '-1)';
        case("(3^x-1)"): return '(3^' + num + '-1)';
        case("(4^x-1)"): return '(4^' + num + '-1)';
        case("tan(x)"): return 'tan(' + num + ')';
        case("arctan(x)"): return 'arctan(' + num + ')';
        case("x^4"): return num + '^4';
        case("x^5"): return num + '^5';
    }

    return 'Try Again';
}