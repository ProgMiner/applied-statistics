import forEach from 'lodash/forEach'

export function filterObject<V = any, K extends keyof any = keyof {}>(object: Record<K, V>, predicate: (v: V, k: K) => boolean) {
    const ret: Record<K, V> = {} as Record<K, V>;

    forEach(object, (v, k) => {
        if (predicate(v, k as K)) {
            ret[k as K] = v;
        }
    });

    return ret;
}
