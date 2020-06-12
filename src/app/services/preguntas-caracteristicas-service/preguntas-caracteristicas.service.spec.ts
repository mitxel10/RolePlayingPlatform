import { TestBed } from '@angular/core/testing';

import { PreguntasCaracteristicasService } from './preguntas-caracteristicas.service';

describe('PreguntasCaracteristicasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreguntasCaracteristicasService = TestBed.get(PreguntasCaracteristicasService);
    expect(service).toBeTruthy();
  });
});
