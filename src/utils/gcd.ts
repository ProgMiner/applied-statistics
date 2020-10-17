
// https://ru.stackoverflow.com/questions/929837/нужно-найти-наибольший-общий-делитель-в-javascript
export function gcd(...nums: number[]) {
    let x = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let y = nums[i];

        if (y < 0) {
            y = -y;
        }

        while (x && y) {
            // noinspection JSSuspiciousNameCombination
            x > y ? x %= y : y %= x;
        }

        // noinspection JSSuspiciousNameCombination
        x += y;
    }

    return x;
}
