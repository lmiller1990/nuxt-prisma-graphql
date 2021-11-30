// https://github.com/sindresorhus/p-defer
export interface DeferredPromise<ValueType> {
  promise: Promise<ValueType>;
  resolve(value?: ValueType | PromiseLike<ValueType>): void;
  reject(reason?: unknown): void;
}

export function pDefer<ValueType>(): DeferredPromise<ValueType>;

export default function pDefer<T>(): DeferredPromise<T> {
  const deferred = {} as any;

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}
