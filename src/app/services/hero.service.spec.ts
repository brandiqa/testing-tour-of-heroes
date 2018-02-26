import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from '@models/hero.model';

const mockData = [
  { id: 1, name: 'Hulk' },
  { id: 2, name: 'Thor'},
  { id: 3, name: 'Iron Man'}
] as Hero[];

describe('HeroService', () => {

  let service;
  let httpTestingController: HttpTestingController;

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

  beforeEach(() => {
    this.mockHeroes = [...mockData];
    this.mockHero = this.mockHeroes[0];
    this.mockId = this.mockHero.id;
  });

  const apiUrl = (id: number) => {
    return `${service.heroesUrl}/${this.mockId}`;
  };

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
        heroes => expect(heroes.length).toEqual(this.mockHeroes.length),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(this.mockHeroes);
    });
  });

  describe('updateHero', () => {

    it('should update hero', () => {
      service.updateHero(this.mockHero).subscribe(
        response => expect(response).toEqual(this.mockHero),
        fail
      );
      // Receive PUT request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush(this.mockHero);
    });
  });

  describe('deleteHero', () => {

    it('should delete hero using id', () => {
      const mockUrl = apiUrl(this.mockId);
      service.deleteHero(this.mockId).subscribe(
        response => expect(response).toEqual(this.mockId),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(this.mockId);
    });

    it('should delete hero using hero object', () => {
      const mockUrl = apiUrl(this.mockHero.id);
      service.deleteHero(this.mockHero).subscribe(
        response => expect(response).toEqual(this.mockHero.id),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(this.mockHero.id);
    });
  });
});
