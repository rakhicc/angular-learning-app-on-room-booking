import { TestBed } from '@angular/core/testing';

import { PreFetchRoomsService } from './pre-fetch-rooms.service';

describe('PreFetchRoomsService', () => {
  let service: PreFetchRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreFetchRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
