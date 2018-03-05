import { TestBed, inject } from '@angular/core/testing';

import { FileLinksService } from './file-links.service';

describe('FileLinksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileLinksService]
    });
  });

  it('should be created', inject([FileLinksService], (service: FileLinksService) => {
    expect(service).toBeTruthy();
  }));
});
