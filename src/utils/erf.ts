
// https://gist.github.com/kcrt/6210661
export function erf(x: number) {
    // erf(x) = 2/sqrt(pi) * integrate(from=0, to=x, e^-(t^2) ) dt
    // with using Taylor expansion,
    //        = 2/sqrt(pi) * sigma(n=0 to +inf, ((-1)^n * x^(2n+1))/(n! * (2n+1)))
    // calculating n=0 to 50 bellow (note that inside sigma equals x when n = 0, and 50 may be enough)

    let m = 1.00;
    let s = 1.00;
    let sum = x;
    for (let i = 1; i < 50; i++) {
        m *= i;
        s *= -1;
        sum += (s * Math.pow(x, 2 * i + 1)) / (m * (2 * i + 1));
    }

    return 2 * sum / Math.sqrt(3.14159265358979);
}