import { DestroyRef, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

export const destroyCustom = () => {
  const subject = new Subject();
  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });
  return () => takeUntil(subject.asObservable());
};
