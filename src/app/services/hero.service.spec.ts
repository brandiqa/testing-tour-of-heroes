import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from '@models/hero.model';

describe('HeroService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  let mockHeroes: Hero[];

  beforeEach(() => {
    mockHeroes = [
      { id: 1, name: 'Hulk' },
      { id: 2, name: 'Thor'},
      { id: 3, name: 'Iron Man'}
    ] as Hero[];
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([HeroService], s => {
    service = s;
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should return mock heroes', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(mockHeroes),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(mockHeroes);
    });
  });

  describe('updateHero', () => {
    it('should update hero', () => {
      const updateHero: Hero = { id: 1, name: 'Superman' };
      service.updateHero(updateHero).subscribe(
        response => expect(response).toEqual(updateHero),
        fail
      );
      // Receive PUT request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush({id: 1, name: 'Superman' });
    });
  });


});
