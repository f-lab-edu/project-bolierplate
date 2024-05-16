// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

type Combine<T, K> = T & Omit<K, keyof T>;
