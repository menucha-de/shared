import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

const DEFAULT_MAX_RETRIES = 5;
export function delayedRetry<T>(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
  let retries: number;
  if (maxRetry != null && maxRetry > 0) {
    retries = maxRetry;
  } else {
    retries = DEFAULT_MAX_RETRIES;
  }

  return (src: Observable<T>) => src.pipe(
    retryWhen(errors => errors.pipe(
      delay(delayMs),
      mergeMap(error => retries-- > 0 ? of(error) : throwError(error))
    ))
  );
}
