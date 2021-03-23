const {
  validateInput,
  validateAllowedFormats,
  validateNormalizedVRM,
  validateFormat,
} = require('./validators');

describe('validateInput', () => {
  it('should return false if not string', () => {
    expect(validateInput(2)).toBe(false);
  });

  it('should return false if length is 0', () => {
    expect(validateInput('')).toBe(false);
  });

  it('should return true if string with value', () => {
    expect(validateInput('test')).toBe(true);
  });
});

describe('validateAllowedFormats', () => {
  it('should return false if not an array', () => {
    expect(validateAllowedFormats('test')).toBe(false);
  });

  it('should return false if empty array', () => {
    expect(validateAllowedFormats([])).toBe(false);
  });

  it('should return false if at least one of the children is not a string', () => {
    expect(validateAllowedFormats([1, 'test', null])).toBe(false);
  });

  it('should return false if at least one of the children has wrong format', () => {
    expect(validateAllowedFormats(['Test', 'test'])).toBe(false);
  });

  it('should return true if all formats are valid', () => {
    expect(validateAllowedFormats(['testTest', 'test1', 'test2'])).toBe(true);
  });
});

describe('validateNormalizedVRM', () => {
  it('should return false if not a string', () => {
    expect(validateNormalizedVRM(1)).toBe(false);
  });

  it('should return false if empty', () => {
    expect(validateNormalizedVRM('')).toBe(false);
  });

  it('should return false if longer than 7 characters', () => {
    expect(validateNormalizedVRM('this is a long string')).toBe(false);
  });

  it('should return false if wrong format', () => {
    expect(validateNormalizedVRM('test @')).toBe(false);
  });

  it('should return true if correct format', () => {
    expect(validateNormalizedVRM('HJ1')).toBe(true);
  });
});

describe('validateFormat', () => {
  it('should return false if not a string', () => {
    expect(validateFormat(1)).toBe(false);
  });

  it('should return false if empty', () => {
    expect(validateFormat('')).toBe(false);
  });

  it('should return false if wrong format', () => {
    expect(validateFormat('Test')).toBe(false);
  });

  it('should return true if correct format', () => {
    expect(validateFormat('military')).toBe(true);
    expect(validateFormat('gb_2001')).toBe(true);
  });
});
