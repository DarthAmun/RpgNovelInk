import { TestBed } from '@angular/core/testing';

import { TextformatterService } from './textformatter.service';

describe('TextformatterService', () => {
  let service: TextformatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextformatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
