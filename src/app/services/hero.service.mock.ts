import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Hero } from '@models/hero.model';

export class MockHeroService {
  getHeroes(): Observable<Hero[]> {
    return of([]);
  }
}
