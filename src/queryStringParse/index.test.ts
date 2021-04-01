import { queryParse } from './index';

const url = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&qwe=null&www=null';

const queryParseResult = {
  name: 'coder',
  age: 20,
  callback: 'https://youzan.com?name=test',
  list: ['a', 'b'],
  json: {
      str: 'abc',
      num: 123
  },
  qwe: '',
  www: '',
}

describe('query parse test', () => {
  it('复杂结构', () => {
    expect(queryParse(url)).toEqual(queryParseResult);
  });
});
