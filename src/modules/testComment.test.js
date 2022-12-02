const { countComments } = require('./countComments.js');

describe('Count comments of a meal item', () => {
  test('No comments', () => {
    const arr = [];
    expect(countComments(arr)).toBe(0);
  });
  test('Expect to get 2 comments back', () => {
    const comments = [{
      creation_date: '2022-12-01',
      username: 'lit',
      comment: 'nice',
    }, {
      creation_date: '2022-12-02',
      comment: 'lizo',
      username: 'sweet',
    }];
    expect(countComments(comments)).toBe(2);
  });
});
