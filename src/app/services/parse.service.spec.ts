import { TestBed, inject } from '@angular/core/testing';
import { ParseService } from './parse.service';
import * as mockQl from '../ql-mock-input';
import * as mockQls from '../qls-mock-input';

describe('ParseService', () => {
  let service: ParseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseService]
    });
  });

  beforeEach(inject([ParseService], (_service: ParseService) => {
    service = _service;
  }));

  it('should parse ql input', () => {
    const parseResult = service.parse(mockQl.validQl, '');
    expect(parseResult.formName).toBe('form');
    expect(parseResult.form).toBeDefined();
    expect(parseResult.styles).toBeUndefined();
  });

  it('should parse ql with qls input', () => {
    const parseResult = service.parse(mockQl.validQl, mockQls.validQLS);
    expect(parseResult.formName).toBe('form');
    expect(parseResult.form).toBeDefined();
    expect(parseResult.styles).toBeDefined();
  });
});
