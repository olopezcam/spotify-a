import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const getAllTracks$ = (): Observable<any> => {
  const URL = environment.api;
  return inject(HttpClient)
    .get(`${URL}/tracks`)
    .pipe(
      map(({ data }: any) => {
        return data;
      })
    );
};

export const skipById = (
  listTracks: TrackModel[],
  id: number
): Promise<TrackModel[]> => {
  return new Promise((resolve, reject) => {
    const listTmp = listTracks.filter((track: TrackModel) => track._id !== id);
    resolve(listTmp);
  });
};

export const getAllRandom$ = (): Observable<any> => {
  const URL = environment.api;
  return inject(HttpClient)
    .get(`${URL}/tracks`)
    .pipe(
      mergeMap(({ data }: any) => skipById(data, 2)),
      catchError(() => {
        return of([]);
      })
    );
};

export const getCurrentUser = (): string => {
  const coockieService = inject(CookieService);
  return coockieService.get('token');
};
