import { tap, map, retryWhen, shareReplay, delayWhen, take } from 'rxjs/operators';
import { timer } from 'rxjs';

// const http$ = this.http.get<Course[]>('/api/courses');

export const autoRetry = (obs$, retryInterval, retryCount) =>
  obs$.pipe(
    // tap(() => console.log('HTTP request executed')),
    // map(res => Object.values(res["payload"]) ),
    shareReplay(),
    retryWhen((errors) => {
      return errors.pipe(
        delayWhen(() => timer(retryInterval)),
        take(retryCount),
        // tap(() => console.log('retrying...')),
      );
    }),
  );

//   const http$ = throwError('Heeee');

// autoRetry(http$, 2000, 2).subscribe(
//   (res) => console.log('HTTP response', res),
//   (err) => console.log('HTTP Error', err),
//   () => console.log('HTTP request completed.'),
// );
