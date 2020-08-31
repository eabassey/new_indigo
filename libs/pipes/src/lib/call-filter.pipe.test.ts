import { FLXCallFilterPipe } from './call-filter.pipe';

describe('CallFilter pipe', () => {
  let pipe: FLXCallFilterPipe;
  beforeEach(() => {
    pipe = new FLXCallFilterPipe();
  });
  test('should handle a valid value', () => {
    // Arrange
    const value = null;
    const items = [];

    // Act
    const result = pipe.transform(value, ...items);

    // Assert
    expect(result).toEqual('');
  });

  test('should return empty string if items array is empty', () => {
    // Arrange
    const value = 'Valid String';
    const items = [];

    // Act
    const result = pipe.transform(value, ...items);

    // Assert
    expect(result).toEqual('');
  });

  test('should return the right name property', () => {
    // Arrange
    const value = '123';
    const items = ['callReason', [{ id: '123', name: 'Mikayla' }]];

    // Act
    const result = pipe.transform(value, ...items);

    // Assert
    expect(result).toEqual('Mikayla');
  });
});
