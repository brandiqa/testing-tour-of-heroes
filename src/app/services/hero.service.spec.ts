import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from '@models/hero.model';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    let mockHeroes: Hero[];

    beforeEach(() => {
      mockHeroes = [
        { id: 1, name: 'Hulk' },
        { id: 2, name: 'Thor'},
        { id: 2, name: 'Iron Man'}
      ];
    });

    it('should return mock heroes', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(mockHeroes),
        fail
      );
      // Respond to GET request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(mockHeroes);
    });
  });


});
