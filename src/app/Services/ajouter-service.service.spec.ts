import { TestBed } from '@angular/core/testing';

import { AjouterServiceService } from './ajouter-service.service';

describe('AjouterServiceService', () => {
  let service: AjouterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjouterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
