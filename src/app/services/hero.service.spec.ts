import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from '@models/hero.model';

const data = [
  { id: 1, name: 'Hulk' },
  { id: 2, name: 'Thor'},
  { id: 3, name: 'Iron Man'}
] as Hero[];

describe('HeroService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  let mockHeroes: Hero[];

  beforeEach(() => {
    mockHeroes = [...data];
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
    mockHeroes = [...data];

    it('should return mock heroes', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(mockHeroes.length),
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
      const mockHero: Hero = mockHeroes[0];
      service.updateHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );
      // Receive PUT request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush(mockHero);
    });
  });

  describe('deleteHero', () => {
    mockHeroes = [...data];

    const mockHero: Hero = mockHeroes[0];
    const mockId = mockHero.id;

    it('should delete hero using id', () => {
      const mockUrl = `${service.heroesUrl}/${mockId}`;
      service.deleteHero(mockId).subscribe(
        response => expect(response).toEqual(mockId),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(mockId);
    });

    it('should delete hero using hero object', () => {
      const mockUrl = `${service.heroesUrl}/${mockHero.id}`;
      service.deleteHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero.id),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(mockHero.id);
    });
  });
});
