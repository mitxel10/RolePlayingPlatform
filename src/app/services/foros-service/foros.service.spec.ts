import { TestBed } from '@angular/core/testing';

import { ForosService } from './foros.service';

describe('ForosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForosService = TestBed.get(ForosService);
    expect(service).toBeTruthy();
  });
});
