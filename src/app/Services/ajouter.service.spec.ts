import { TestBed } from '@angular/core/testing';

import { AjouterService } from './ajouter.service';

describe('AjouterService', () => {
  let service: AjouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
