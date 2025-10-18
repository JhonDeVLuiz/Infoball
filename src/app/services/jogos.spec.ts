import { TestBed } from '@angular/core/testing';

import { JogosService  } from './jogos';

describe('Jogos', () => {
  let service: JogosService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JogosService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});