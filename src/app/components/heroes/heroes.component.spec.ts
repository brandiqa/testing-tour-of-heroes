import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '@services/hero.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroServiceStub: HeroService;

  beforeEach(async(() => {
    heroServiceStub = {
      getHeroes: () => {
          return [];
      }
    }

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [{
        provide: HeroService,
        useValue: heroServiceStub
      }],
      schemas: [ NO_ERRORS_SCHEMA ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
