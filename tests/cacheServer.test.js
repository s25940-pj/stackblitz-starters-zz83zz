const request = require('supertest');
const http = require('http');

describe('Testowanie cache serwera HTTP', () => {
  let server;
  beforeAll(() => {
    server = require('../cacheServer'); // Ścieżka do pliku serwera
  });

  afterAll(() => {
    server.close(); // Zamykanie serwera po zakończeniu testów
  });

  test('Powinien zwrócić nowe dane dla pierwszego żądania', async () => {
    const firstResponse = await request(app).get('/data');
    expect(firstResponse.text).toContain('Dane do cache');
  });

  test('Powinien zwrócić dane z cache dla drugiego żądania', async () => {
    const firstResponse = await request(app).get('/data');
    const secondResponse = await request(app).get('/data');
    expect(secondResponse.text).toEqual(firstResponse.text);
  });
});
