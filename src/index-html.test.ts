import { readFileSync } from 'node:fs';

describe('document shell', () => {
  const html = readFileSync('index.html', 'utf8');

  it('sets the viewport to the device width for mobile responsive CSS', () => {
    expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
  });
});
