import { Injectable } from '@angular/core';

import { Hero } from '@models/hero.model';
import { HEROES } from '@mocks/heroes.mock';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }

}
