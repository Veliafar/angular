import { PreloadingStrategy, Route } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';

export class LazyRoutePreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, preload: Function): Observable<any> {
        if (route.data && route.data.preload) {
            return preload();
        } else {
            return of(null);
        }
    }
}
