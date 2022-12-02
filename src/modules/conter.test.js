
// Arrange
const { counter } = require('./counter.js');
const counter = (count) => count.length;

//act
describe('Count food displayed', () => {
  test('Empty array', () => {
    const arr = [];
    // assert
    expect(counter(arr)).toBe(0);
  });
  test('Expect to get 12 foods back', () => {
    const meals = [{ item_id: '2345' }, { item_id: '4562' }, { item_id: '139' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }, { item_id: '748' }];
    // assert
    expect(counter(meals)).toBe(12);
  });
});
