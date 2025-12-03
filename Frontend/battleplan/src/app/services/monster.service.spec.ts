import { TestBed } from '@angular/core/testing';

import { MonsterService } from './monster.service';

describe('Monsters', () => {
  let service: MonsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
