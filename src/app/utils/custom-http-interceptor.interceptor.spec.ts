import { TestBed } from '@angular/core/testing';

import { CustomHttpInterceptorInterceptor } from './custom-http-interceptor.interceptor';

describe('CustomHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomHttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomHttpInterceptorInterceptor = TestBed.inject(CustomHttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
