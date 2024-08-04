import { TestBed } from '@angular/core/testing';

import { PDFsService } from './pdfs.service';

describe('PDFsService', () => {
  let service: PDFsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDFsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
