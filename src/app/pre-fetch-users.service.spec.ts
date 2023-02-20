import { TestBed } from '@angular/core/testing';

import { PreFetchUsersService } from './pre-fetch-users.service';

describe('PreFetchUsersService', () => {
  let service: PreFetchUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreFetchUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
