import { TestBed } from '@angular/core/testing';

import { UpvoteService } from './upvote.service';

describe('UpvoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpvoteService = TestBed.get(UpvoteService);
    expect(service).toBeTruthy();
  });
});
