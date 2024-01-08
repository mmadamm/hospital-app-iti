// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoadingService {
//   private loadingSubject = new BehaviorSubject<boolean>(false);

//   setLoading(loading: boolean): void {
//     this.loadingSubject.next(loading);
//   }

//   isLoading$ = this.loadingSubject.asObservable();
// }
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private zone: NgZone) {}

  setLoading(loading: boolean): void {
    // Run outside Angular zone to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.zone.runOutsideAngular(() => {
      this.loadingSubject.next(loading);
    });
  }

  isLoading$ = this.loadingSubject.asObservable();
}
