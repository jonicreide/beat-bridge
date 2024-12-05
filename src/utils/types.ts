type PublicNonFunctionProps<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type ClassAttributes<T> = Pick<T, PublicNonFunctionProps<T>>;

export type NullableError = Error | null | undefined;
export type TNullable<T> = T | null | undefined;

type SafeAsyncInput = (...args: any) => Promise<any>;
export const safeAsync = async <TReturn extends TNullable<any> = any>(
  call: SafeAsyncInput,
): Promise<[TReturn | null | undefined, NullableError]> => {
  try {
    const result = await call();
    return [result, null];
  } catch (error) {
    return [null, error as Error];
  }
};
